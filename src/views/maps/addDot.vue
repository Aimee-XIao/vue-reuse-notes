<template>
  <div class="home">
    <div id="topbar">
      <el-button
        class="action-button"
        id="pointButtonNumber"
        type="button"
        title="Draw point with number"
      >
        1
      </el-button>
      <el-button
        class="action-button"
        id="pointButtonLetter"
        type="button"
        title="Draw point with letter"
      >
        A
      </el-button>
      <el-button
        class="action-button esri-icon-trash"
        id="resetBtn"
        type="button"
        title="Clear graphics"
      ></el-button>
    </div>
    <div id="dotBox"></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import _ from "loadsh";
export default {
  computed: {
    ...mapGetters(["mapOption"]),
  },
  mounted() {
    this.initMapsa();
  },
  methods: {
    // arcgis for portal item:  用于门户项目的arcgis
    initMapsa() {
      const that = this;
      this.$esriLoader
        .loadModules(
          [
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/MapImageLayer",
            "esri/widgets/ScaleBar", // 比例尺
            "esri/widgets/Fullscreen", //全屏
            "esri/widgets/Sketch/SketchViewModel",
            "esri/widgets/Expand",
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "dojo/domReady!",
          ],
          this.mapOption
        )
        .then(
          ([
            Map,
            MapView,
            MapImageLayer,
            ScaleBar,
            Fullscreen,
            SketchViewModel,
            Expand,
            Graphic,
            GraphicsLayer,
          ]) => {
            let tileLayer = new MapImageLayer({
              // 可配置属性，见TileLayer类
              url: "http://localhost:6080/arcgis/rest/services/wangMap/wangyu1/MapServer",
            });
            // 创建一个地图实例
            const map = new Map({
              layers: [tileLayer],
            });

            // 创建地图视图
            const view = new MapView({
              container: "dotBox", // 视图的容器
              map: map, // Map的实例放入视图中
            });

            // 添加比列尺
            const scaleBar = new ScaleBar({
              view: view,
              unit: "metric", //metric: 米
            });
            view.ui.add(scaleBar, {
              position: "bottom-left",
            });

            // 全屏
            const fullscreen = new Fullscreen({
              view: view,
            });
            view.ui.add(fullscreen, "top-left");

            // 绘制点
            let numberIndex = 1;
            let letterIndex = 1;
            let pointType = "number";
            const initialGraphics = [];
            const graphicsLayer = new GraphicsLayer({
              graphics: initialGraphics,
            });
            map.add(graphicsLayer);

            view.when(() => {
              // 创建一个新的 sketch 模型
              const sketchViewModel = new SketchViewModel({
                view,
                layer: graphicsLayer,
              });

              // 监听-添加新创建的图形完成
              sketchViewModel.on("create", addGraphic);

              // sketchViewModel的创建完成事件时调用
              function addGraphic(event) {
                if (event.state === "complete") {
                  const cimSymbol = {
                    type: "cim",
                    // 获取定义CIMPointSymbol的JSON数据
                    data: {
                      type: "CIMSymbolReference",
                      symbol: getPointSymbolData(),
                    },
                  };
                  graphicsLayer.remove(event.graphic);
                  const newGraphic = new Graphic({
                    geometry: event.graphic.geometry,
                    symbol: cimSymbol,
                  });
                  graphicsLayer.add(newGraphic);

                  sketchViewModel.create("point");
                }
              }

              const drawPointButtonLetter = document.getElementById("pointButtonLetter");
              drawPointButtonLetter.onclick = () => {
                // 设置sketch以创建点几何图形
                sketchViewModel.create("point");
                setActiveButton(drawPointButtonLetter);
                pointType = "letter";
              };

              const drawPointButtonNumber =
                document.getElementById("pointButtonNumber");
              sketchViewModel.create("point");
              setActiveButton(drawPointButtonNumber);
              drawPointButtonNumber.onclick = () => {
                // 设置sketch以创建点几何图形
                sketchViewModel.create("point");
                setActiveButton(drawPointButtonNumber);
                pointType = "number";
              };

              // reset button
              document.getElementById("resetBtn").onclick = () => {
                graphicsLayer.removeAll();
                setActiveButton();
                numberIndex = 1;
                letterIndex = 1;
              };

              function setActiveButton(selectedButton) {
                view.focus();
                const elements = document.getElementsByClassName("active");
                for (let i = 0; i < elements.length; i++) {
                  elements[i].classList.remove("active");
                }
                if (selectedButton) {
                  selectedButton.classList.add("active");
                }
              }
            });

            function getPointSymbolData() {
              return {
                type: "CIMPointSymbol",
                symbolLayers: [
                  {
                    type: "CIMVectorMarker",
                    enable: true,
                    size: 32,
                    colorLocked: true,
                    anchorPointUnits: "Relative",
                    frame: { xmin: -5, ymin: -5, xmax: 5, ymax: 5 },
                    markerGraphics: [
                      {
                        type: "CIMMarkerGraphic",
                        geometry: { x: 0, y: 0 },
                        symbol: {
                          type: "CIMTextSymbol",
                          fontFamilyName: "Arial",
                          fontStyleName: "Bold",
                          height: 4,
                          horizontalAlignment: "Center",
                          offsetX: 0,
                          offsetY: 5.5,
                          symbol: {
                            type: "CIMPolygonSymbol",
                            symbolLayers: [
                              {
                                type: "CIMSolidFill",
                                enable: true,
                                color: [255, 255, 255, 255],
                              },
                            ],
                          },
                          verticalAlignment: "Center",
                        },
                        textString:
                          pointType === "number"
                            ? String(numberIndex++)
                            : String.fromCharCode(64 + letterIndex++),
                      },
                    ],
                    scaleSymbolsProportionally: true,
                    respectFrame: true,
                  },
                  {
                    type: "CIMVectorMarker",
                    enable: true,
                    anchorPoint: { x: 0, y: -0.5 },
                    anchorPointUnits: "Relative",
                    size: 36.8,
                    frame: { xmin: 0.0, ymin: 0.0, xmax: 17.0, ymax: 17.0 },
                    markerGraphics: [
                      {
                        type: "CIMMarkerGraphic",
                        geometry: {
                          rings: [
                            [
                              [8.5, 0.2],
                              [7.06, 0.33],
                              [5.66, 0.7],
                              [4.35, 1.31],
                              [3.16, 2.14],
                              [2.14, 3.16],
                              [1.31, 4.35],
                              [0.7, 5.66],
                              [0.33, 7.06],
                              [0.2, 8.5],
                              [0.33, 9.94],
                              [0.7, 11.34],
                              [1.31, 12.65],
                              [2.14, 13.84],
                              [3.16, 14.86],
                              [4.35, 15.69],
                              [5.66, 16.3],
                              [7.06, 16.67],
                              [8.5, 16.8],
                              [9.94, 16.67],
                              [11.34, 16.3],
                              [12.65, 15.69],
                              [13.84, 14.86],
                              [14.86, 13.84],
                              [15.69, 12.65],
                              [16.3, 11.34],
                              [16.67, 9.94],
                              [16.8, 8.5],
                              [16.67, 7.06],
                              [16.3, 5.66],
                              [15.69, 4.35],
                              [14.86, 3.16],
                              [13.84, 2.14],
                              [12.65, 1.31],
                              [11.34, 0.7],
                              [9.94, 0.33],
                              [8.5, 0.2],
                            ],
                          ],
                        },
                        symbol: {
                          type: "CIMPolygonSymbol",
                          symbolLayers: [
                            {
                              type: "CIMSolidFill",
                              enable: true,
                              color: [39, 129, 153, 255],
                            },
                          ],
                        },
                      },
                    ],
                    scaleSymbolsProportionally: true,
                    respectFrame: true,
                  },
                  {
                    type: "CIMVectorMarker",
                    enable: true,
                    anchorPoint: { x: 0, y: 0 },
                    anchorPointUnits: "Relative",
                    size: 4,
                    frame: {
                      xmin: 0.0,
                      ymin: 0.0,
                      xmax: 39.7,
                      ymax: 17.0,
                    },
                    markerGraphics: [
                      {
                        type: "CIMMarkerGraphic",
                        geometry: {
                          rings: [
                            [
                              [32.2, 0.0],
                              [7.4, 0.0],
                              [6.0, 0.2],
                              [4.6, 0.6],
                              [3.3, 1.4],
                              [2.2, 2.5],
                              [1.2, 3.8],
                              [0.6, 5.2],
                              [0.1, 6.8],
                              [0.0, 8.5],
                              [0.1, 10.2],
                              [0.6, 11.8],
                              [1.2, 13.2],
                              [2.2, 14.5],
                              [3.3, 15.6],
                              [4.6, 16.4],
                              [6.0, 16.8],
                              [7.4, 17.0],
                              [32.2, 17.0],
                              [33.7, 16.8],
                              [35.1, 16.4],
                              [36.4, 15.6],
                              [37.5, 14.5],
                              [38.4, 13.2],
                              [39.1, 11.7],
                              [39.6, 10.2],
                              [39.7, 8.5],
                              [39.6, 6.8],
                              [39.1, 5.3],
                              [38.4, 3.8],
                              [37.5, 2.5],
                              [36.4, 1.4],
                              [35.1, 0.6],
                              [33.7, 0.2],
                              [32.2, 0.0],
                            ],
                          ],
                        },
                        symbol: {
                          type: "CIMPolygonSymbol",
                          symbolLayers: [
                            {
                              type: "CIMSolidFill",
                              enable: true,
                              color: [170, 170, 170, 255],
                            },
                          ],
                        },
                      },
                    ],
                    scaleSymbolsProportionally: true,
                    respectFrame: true,
                  },
                ],
              };
            }
          }
        )
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 694px;
  position: relative;
  #dotBox {
    width: 100%;
    height: 100%;
  }
  #topbar {
    position: absolute;
    z-index: 3;
    right: 0px;
  }
}
</style>
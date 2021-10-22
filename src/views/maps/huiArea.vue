<template>
  <div class="home">
    <div id="areaBox"></div>
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
            "esri/layers/GraphicsLayer",
            "esri/widgets/Expand", // 存取器
            "esri/widgets/Sketch", // 绘制草图-小工具
            "dojo/domReady!",
          ],
          this.mapOption
        )
        .then(
          ([Map, MapView, MapImageLayer, GraphicsLayer, Expand, Sketch]) => {
            let tileLayer = new MapImageLayer({
              // 可配置属性，见TileLayer类
              url: "http://localhost:6080/arcgis/rest/services/wangMap/wangyu1/MapServer",
            });
            // 添加工具
            const graphicsLayer = new GraphicsLayer();
            // 创建一个地图实例
            const map = new Map({
              layers: [tileLayer, graphicsLayer],
            });

            // 创建地图视图
            const view = new MapView({
              container: "areaBox", // 视图的容器
              map: map, // Map的实例放入视图中
            });
            const sketch = new Sketch({
              layer: graphicsLayer,
              view: view,
              // 图形创建后将立即被选中
              creationMode: "update",
              snappingOptions: { // 捕捉选项
                enabled: true, // 默认情况下，snapping是处于启动状态
                featureSources: [{ layer: graphicsLayer }], //feature snapping将在GraphicsLayer上启用
              },
            });

            const configurationExpand = new Expand({
              expandIconClass: "esri-icon-setting2",
              expandTooltip: "Show snapping configuration", // 要显示的工具提示，指示可以展开小部件
              expanded: true, // 指示小部件当前是否已展开
              view: view,
              content: document.getElementById("configurationDiv"),
            });

            view.when(() => {
              // 添加sketch组件到视图上
              view.ui.add(sketch, "top-right");
              view.ui.add(configurationExpand, "bottom-right");

              // magnifier
              view.magnifier.visible = false;
              view.magnifier.factor = 1.7;
              view.magnifier.size = 200; //magnifier图片尺寸
              view.magnifier.offset = { x: 75, y: 75 };

              // 无论光标出现在地图上的何处，都显示放大镜
              view.on("pointer-move", (evt) => {
                view.magnifier.position = {
                  x: evt.x,
                  y: evt.y,
                };
              });

              // 添加快捷键以切换放大镜可见性。使用“m”键
              view.on(["key-down", "key-up"], (event) => {
                if (event.type === "key-down" && event.key === "m") {
                  view.magnifier.visible = toggle ? false : true;
                }

                if (event.type === "key-up" && event.key === "m") {
                  view.magnifier.visible = toggle ? false : true;
                }
                magnifierSilder.checked = view.magnifier.visible;
              });
            });

            magnifierSilder.onchange = () => {
              toggleMagnifier();
            };

            selfSnapCheckBox.checked = sketch.snappingOptions.selfEnabled;
            selfSnapCheckBox.addEventListener("change", (event) => {
              sketch.snappingOptions.selfEnabled = event.target.checked
                ? true
                : false;
            });

            featureSnapCheckBox.checked = sketch.snappingOptions.featureEnabled;
            featureSnapCheckBox.addEventListener("change", (event) => {
              sketch.snappingOptions.featureEnabled = event.target.checked
                ? true
                : false;
            });

            // toggle the Magnifier visibility
            function toggleMagnifier() {
              toggle = !toggle;
              view.magnifier.visible = toggle;
              view.focus(); // focus back to the view to listen for 'm' key
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
  #areaBox {
    width: 100%;
    height: 100%;
  }
  #drawTool {
    position: absolute;
    z-index: 3;
    right: 0px;
  }
}
</style>
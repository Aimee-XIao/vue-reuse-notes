<template>
  <div class="home">
    <div id="drawTool">
      <el-button id="line">绘制折线</el-button>
      <el-button id="remove">清除全部图形</el-button>
    </div>
    <div id="mapBox"></div>
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
            "esri/views/draw/Draw",
            "esri/Graphic",
            "esri/geometry/geometryEngine",
            "dojo/domReady!",
          ],
          this.mapOption
        )
        .then(([Map, MapView, MapImageLayer, ScaleBar, Fullscreen, Draw, Graphic, geometryEngine]) => {
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
            container: "mapBox", // 视图的容器
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

          // 绘制线条
          const draw = new Draw({
            view: view
          })
        
          // 绘制线条的按钮事件
          document.getElementById('line').onclick = () => {
            view.graphics.removeAll()

            // 创建并返回PolyLineDrawAction的实例
            const action = draw.create('polyline')
            // 聚焦视图以激活用于绘制草图的键盘快捷键
            view.focus()
            // 监听polylineDrawAction事件，在视图上绘制线条时立即显示
            action.on([
              "vertex-add",
              "vertex-remove",
              "cursor-update",
              "redo",
              "undo",
              "draw-complete"
            ],updateVertices)
          }

          // 检查最后一个顶点是否使直线与其自身相交。
          function updateVertices(event) {
            
            if(event.vertices.length > 1) {
              // 从返回的顶点创建多线段
              const result = createGraphic(event)
              // 如果最后一个顶点使直线与其自身相交，则禁止触发事件
              if(result.selfIntersects) {
                event.preventDefault();
              }
            }
          }

          // 创建一个新的图形，显示正在视图上绘制的线段
          function createGraphic(event) {
            const vertices = event.vertices
            view.graphics.removeAll()
            // 正在绘制的多线段的图形
            const graphic = new Graphic({
              geometry: {
                type: 'polyline',
                paths: vertices,
                spatialReference: view.spatialReference
              },
              symbol: {
                type: 'simple-line',
                color: [4, 90, 141],
                width: 4,
                cap: 'round',
                join: 'round'
              }
            })

            // 检查多线段是否与自身相交
          const intersectingSegment = getIntersectingSegment(graphic.geometry)
           
          //  为相交线段添加新图形
          if(intersectingSegment) {
            view.graphics.addMany([graphic, intersectingSegment])
          } else {
            // 如果没有交点，只需要添加表示多线段的图形
            view.graphics.add(graphic)
          }

          return {
            selfIntersects: intersectingSegment
          }
          }

          // 检查直线是否与自身相交的函数
          function isSelfIntersecting(polyline) {
            if(polyline.paths[0].length < 3) {
              return false
            }
            const line = polyline.clone()

            // 从正在绘制的多段线中获取最后一条线段
            const lastSegment = getLastSegment(polyline)
            line.removePoint(0, line.paths[0].length - 1)
            // 如果直线与自身相交，则返回true，否则返回false
            return geometryEngine.crosses(lastSegment, line)
          }

          // 检查直线是否与自身相交。如果是，更改最后一段的符号，显示在图中。
          function getIntersectingSegment(polyline) {
          if (isSelfIntersecting(polyline)) {
            return new Graphic({
              geometry: getLastSegment(polyline),
              symbol: {
                type: "simple-line", //
                style: "short-dot",
                width: 3.5,
                color: "yellow"
              }
            });
          }
          return null;
        }

        // 获取正在绘制的多段线的最后一段
        function getLastSegment(polyline) {
          const line = polyline.clone();
          const lastXYPoint = line.removePoint(0, line.paths[0].length - 1);
          const existingLineFinalPoint = line.getPoint(
            0,
            line.paths[0].length - 1
          );

          return {
            type: "polyline",
            spatialReference: view.spatialReference,
            hasZ: false,
            paths: [
              [
                [existingLineFinalPoint.x, existingLineFinalPoint.y],
                [lastXYPoint.x, lastXYPoint.y]
              ]
            ]
          };
        }

        // 清空绘制的图形
        document.getElementById('remove').onclick = () => {
          view.graphics.removeAll()
        }

        })
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
  #mapBox {
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
<template>
  <div class="home">
    <div id="maps"></div>
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
    this.initMaps();
  },
  methods: {
    pruneEmpty(obj) {
       for( var i in obj ) { 
                    if ( typeof obj[i] === "object" ) { 
                        this.pruneEmpty ( obj[i] ); 
                    }else{ 
                        if(obj[i] === null){
                          console.log(i)
                        }
                    } 
                } 
      
    },
    // arcgis for portal item:  用于门户项目的arcgis
    initMaps() {
      var that = this
      this.$esriLoader
        .loadModules([
          "esri/WebMap", // 是从arcgis online 或 arcgis for portal item 上获取显示到用户的界面中
          "esri/views/MapView",
          "esri/tasks/Locator",
        ])
        .then(([WebMap, MapView, Locator]) => {
          const locatorTask = new Locator({
            url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
          });
          const webmap = new WebMap({
            portalItem: {
              id: "f2e9b762544945f390ca4ac3671cfa72",
            },
          });

          const view = new MapView({
            container: "maps",
            map: webmap,
          });
          view.on("click", function (event) {
            event.stopPropagation();
            const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
            const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
            view.popup.open({
              title: "当前经纬度为：[" + lat + "," + lon + "]",
              location: event.mapPoint,
            });
          });
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
  #maps {
    width: 100%;
    height: 100%;
  }
}
</style>
<template>
  <div class="home">
    <div id="map"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Home",
  mounted() {
    this.initMap();
  },
  computed: {
    ...mapGetters(['mapOption'])
  },
  methods: {
    // 创建地图
    initMap() {
      this.$esriLoader
        .loadModules(["esri/Map", "esri/views/MapView", "dojo/domReady!"], this.mapOption)
        .then(([Map, MapView]) => {
          // 实例化地图
          const map = new Map({
            basemap: "streets",
          });
          // 实例化地图视图
          const views = new MapView({
            container: "map",
            map: map,
            zoom: 8,
          });
          console.log(views);
        });
    },
  },
};
</script>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 694px;
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>

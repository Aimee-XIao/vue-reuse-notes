<template>
  <div class="mapbox">
    <el-tabs type="border-card">
      <el-tab-pane label="基础地图">
        <BaseMap></BaseMap>
      </el-tab-pane>
      <el-tab-pane label="点位坐标">
        <Biaodian></Biaodian>
      </el-tab-pane>
      <el-tab-pane label="加载本地地图-划线">
        <Qiepian></Qiepian>
      </el-tab-pane>
      <el-tab-pane label="加载本地地图-绘点">
        <Huidian></Huidian>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BaseMap from './maps/baseMap.vue'
// 弹出点位坐标
import Biaodian from './maps/biaodian.vue'
// 加载切片地图
import Qiepian from './maps/renshubiaoshi.vue'
import Huidian from './maps/addDot.vue'
export default {
  components: {
    BaseMap,
    Biaodian,
    Qiepian,
    Huidian
  }
};
</script>
<style scoped lang="scss">
.mapbox {
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
}
</style>
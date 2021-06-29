<!--
 * @Author: Aimee
 * @LastEditors: Aimee
 * @Date: 2021-09-29 10:11
 * @LastEditTime:
 * @Description: 混入学习
 * @FilePath: \vue-reuse\src\views\mixin.vue
 * ( •`ω´•)✧
-->
<template>
  <div class="mixin">
    <el-input v-model="msg" type="text"></el-input>
    <el-button style="margin-top: 20px" type="primary" @click="printMsg">printMsg</el-button>
  </div>
</template>

<script>
import mixin from "../mixins/mixin";
export default {
  mixins:[mixin],
  data() {
    return {
      msg:'Hellow!!!'
    }
  },
  // created() {
  //   console.log('Hellow!!!')
  // },
  methods: {
    printMsg() {
      console.log('Hellow!!!')
    }
  }
  // mounted() {
  //   this.printMsg()
  // }
};
</script>
<style lang="scss" scoped>
.mixin {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>

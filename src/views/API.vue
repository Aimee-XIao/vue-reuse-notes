<template>
  <div style="text-align: left">
    <p>应用配置</p>
    <p>Vue.obserable</p>
    <hr>
    <p>选项/配置</p>
    <hr>
    <p>aplus----{{aplus}}</p>
    <p>a----{{a}}</p>
  </div>
</template>

<script>

export default {
  name: "API",
  data() {
    return {
      a: 2
    }
  },
  computed: {
    // 读取和设置
    aplus: {
      get() {
        return this.a + 1
      },
      set(v) {
        this.a = v - 1
      }
    }
  }
};
</script>

<style scoped>
p {
  padding: 10px;
}
</style>
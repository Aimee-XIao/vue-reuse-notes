<template>
  <div>
    <p>插件</p>
    <button @click="toast">测试自定义插件</button>
  </div>

</template>

<script>

export default {
  name: "plug-in-unit",
  methods: {
    toast() {
      this.$toast('测试自定义插件', 5000)
    }
  }
};
</script>

<style scoped>

</style>
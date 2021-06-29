<template>
  <div>
    <input v-focus type="text">
    <div>
      <img :preview="1" src="../assets/timg.jpg"  alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "import-file",
  // 注册局部指令
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  }
};

</script>

<style scoped lang="scss">
</style>
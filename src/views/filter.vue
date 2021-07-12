<template>
  <div>
   <p>过滤器</p>
    <input v-model=" message" type="text" placeholder="将输入的首字母转换为大写">
    <p>{{message | capitalize}}</p>
  </div>

</template>

<script>
export default {
  name: "filter",
  data() {
    return {
      message:''
    }
  },
  filters: {
    capitalize: function(value) {
      if(!value) return
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
};
</script>

<style scoped>

</style>
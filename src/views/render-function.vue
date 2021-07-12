<template>
<div>
  <h1>{{ blogTitle }}</h1>
  <p>渲染函数创建a链接</p>
  <anchored-heading :level="1">Hello world!</anchored-heading>
  <p>渲染函数自练习</p>
  <my-button @click="button" :level="1" :title="'按钮'"/>
  <p>使用JS代替模板功能</p>
  <div @click.capture="alert('father')">
    <div @click="alerts('mine')">修饰符.capture</div>
  </div>
  <form name="formA">
    <select name="a" size="1" id="obj">
      <option value="a">1</option>
      <option value="b">2</option>
      <option value="c">3</option>
    </select>
    <input type="button" @focus="compoted" value="lkh">
  </form>
  <ol>
    <li>百度</li>
    <li>http://www.baidu.com</li>
  </ol>
  <a href="http://localhost:8081/#/render-function" target="_blank">sdfsdf</a>
  <p>函数式组件</p>
  <FunctionalButton @click="log">
    Click me
  </FunctionalButton>
</div>
</template>

<script>
import FunctionalButton from '../components/functioncomponent'
export default {
  name: "mixer",
  data() {
    return {
      blogTitle:'学习笔记'
    }
  },
  components:{
    FunctionalButton
  },
  mounted() {
    console.log(Number(null))
  },
  methods: {
    log() {
     alert('此按钮由函数式组件渲染')
    },
    compoted(){
      console.log('---------')
    },
    button() {},
    alert(e){
      alert(e)
    },
    alerts(e){
      alert(e)
    }
  }
};
</script>

<style scoped lang="scss">
</style>




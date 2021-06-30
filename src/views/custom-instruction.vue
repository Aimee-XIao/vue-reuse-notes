<template>
  <div>

    <div class="my-directive" v-my-dir></div>
    <div style="width: 200px;margin-top: 20px;">
      <img style="width: 100%;" :preview="1" src="../assets/timg.jpg"  alt="">
    </div>
    <div class="pic-box">
      <h3>钩子函数参数</h3>
      <div class="pic-box-content">
        <p> * <span class="pic-box-content-title">el:</span>指令所绑定的元素，可以用来直接操作 DOM</p>
        <img :preview="1" src="../assets/custom/el.png" alt="">
      </div>
      <div class="pic-box-content">
        <p> * <span class="pic-box-content-title">binding:</span>一个对象，包含以下 property</p>
        <img :preview="1" src="../assets/custom/binding.png" alt="">
      </div>
      <div class="pic-box-content">
        <p> * <span class="pic-box-content-title">vnode:</span>Vue 编译生成的虚拟节点</p>
        <img :preview="1" src="../assets/custom/vnode.png" alt="">
      </div>
      <h4>动态指令参数</h4>
      <div class="pic-box-content">
        <p> * <span class="pic-box-content-title">指令的参数可以是动态的:</span></p>
        <p style="text-align: left">例如，在 v-mydirective:[argument]="value" 中，argument 参数可以根据组件实例数据进行更新！</p>
        <img :preview="1" src="../assets/custom/img_1.png" alt="">
        <img :preview="1" src="../assets/custom/img.png" alt="">
      </div>
    </div>
    <div style="width: 100px;height: 100px;background-color:#ffcc9987;" v-position:top="200" ></div>
  </div>
</template>

<script>
export default {
  name: "import-file",
  // 注册局部指令
  directives: {
    myDir: {
      // 指令的定义
      bind: function (el,binding, vnode) {
        console.log('vnode',vnode)
        var s = JSON.stringify
        el.innerHTML =
          '<p>'+'name: '       + s(binding.name) + '</p>'+'<br>' +
          '<p>'+'value: '      + s(binding.value) + '</p>'+'<br>' +
          '<p>'+'expression: ' + s(binding.expression) + '</p>'+'<br>' +
          '<p>'+'argument: '   + s(binding.arg) + '</p>'+'<br>' +
          '<p>'+'modifiers: '  + s(binding.modifiers) + '</p>'+'<br>' +
          '<p>'+'vnode keys: ' + Object.keys(vnode).join(', ')+ '</p>'
      }
    },

    position:  {
      bind:function (el, binding){
        console.log('el',el)
        console.log('binding',binding)
        el.style.position = 'fixed'
        var s = (binding.arg == 'left'?'left':'top')
        el.style[s] = binding.value + 'px'
      }
    }
  }
};

</script>

<style scoped lang="scss">
@import "../common/base";
.my-directive {
  text-align: left;
}
.pic-box {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  justify-content: flex-start;
  &-content {
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    justify-content: flex-start;
    background-color: #ffffff7d;
    border-radius: 10px;
    margin-top: 10px;
    padding: 10px;
    p {
      margin-bottom: 20px;
    }
    img {
      width: 300px;
    }
    &-title {
      color: $theme-color;
      margin-right: 8px;
    }
  }
}
</style>
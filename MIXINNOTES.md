### 混入(mixin)
```angular2html
1. 用来分发Vue组件中的可复用功能。
2. 一个混入对象可以包含任意组件选项。
3. 当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
```
```javascript
//定义一个混入对象 @FilePath: \vue-reuse\src\mixins\mixin.vue
export default {
  data(){
    return {
      msg:'hellow, Aimee'
    }
  },
  methods: { 
    printMsg() {
      console.log(this.msg)
    }
  }
};
// 定义一个组件使用混入对象 @FilePath: \vue-reuse\src\views\mixin.vue
<template>
  <div>
    <input v-model="msg" type="text" />   //msg内容为hellow, Aimee
  </div>
</template>
<script>
import mixin from "../mixins/mixin"; 
export default {
  mixins: [mixin],
  mounted() {
    this.printMsg()
  }
};
</script>
```
```angular2html
选项合并：当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行"合并"。
* 数据对象在内部进行递归合并，并在发生冲突时以组件数据优先。
* 同名的钩子函数将合并为一个数组，因此都会被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
* 值为对象的选项，例如methods、components和directives，将被合并为同一个对象。
  两个对象键名冲突时，取组件对象的键值对。
```
```javascript
//定义一个混入对象 @FilePath: \vue-reuse\src\mixins\mixin.vue
//数据对象在内部进行递归合并，并在发生冲突时以组件数据优先。
export default {
  data(){
    return {
      msg:'hellow, Aimee'
    }
  },
  created() {
    console.log('hellow, Aimee')
  },
  methods: { 
    printMsg() {
      console.log('hellow, Aimee')
    }
  }
};
// 定义一个组件使用混入对象 @FilePath: \vue-reuse\src\views\mixin.vue
<template>
  <div>
    <input v-model="msg" type="text" />  //msg内容为Hellow!!!
  </div>
</template>
<script>
import mixin from "../mixins/mixin"; 
export default {
  mixins: [mixin],
  data() {
   return {
     msg: 'Hellow!!!' 
    }  
  },
  created() {
     console.log('Hellow!!!')
  },
  methods: {
    printMsg() {
      console.log('Hellow!!!')
    }
}
 };
/*
  1、同名的钩子函数将合并为一个数组，因此都会被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
  console的执行结果为:
     hellow, Aimee
     Hellow!!!
  2、值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
  printMsg()函数执行结果：
    Hellow!!!
*/
</script>
```

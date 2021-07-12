### 应用配置
```markdown
每个Vue应用都会暴露一个 config 对象
eg:
    const app = createApp({})
    app.config
| 参数名 | 参数类型 | 默认值 | 用法 |
| errorHandler  |  function    |  underfined   |  app.config.errorHandler = (err, vm, info) => {         |
                                                    // 处理错误
                                                    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
                                                   }  
                                                   指定一个处理函数，来处理组件渲染方法和侦听器执行期间抛出的未捕获错误。
                                                   这个处理函数被调用时，可以获取错误信息和应用实例
Vue.config.productionTip: 设置为false， 阻止vue在启动时生成生产提示----you are running vue in development mode
```
### 全局API
```markdown
# Vue.extend(options)

用法：使用基础的Vue构造器，创建一个“子类”。参数是一个包含组件选项的对象。
data 选项，在Vue.extend()中它必须是函数
eg:
    vue-reuse\src\components\plug\toast\index.vue 是一个组件模板模板
    vue-reuse\src\components\plug\toast\index.js 注册组件
        引入组件模板
        import ToastComponent from './index.vue'
        使用Vue.extend创建子类：
        Vue.extend(ToastComponent)
![api.png](api.png)

# Vue.nextTick([callback,context])
用法：在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM


```
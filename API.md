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
```

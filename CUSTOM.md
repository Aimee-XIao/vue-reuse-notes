### 自定义指令
注册一个全局指令
eg:
```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
})
注册局部指令，组件中也接受一个`directives`的选项
directives: {
    focus: {
    // 指令的定义
    inserted: function (el) {
        el.focus()
     }
    }
}

//使用方法
<input v-focus type="text">
```
```markdown
一个指令定义对象可以提供如下几个钩子函数(均为可选)
· `bind`：只调用一次，指令第一次绑到元素上是调用。在这里可以进行一次性的初始操作。
· `inserted`：被绑定元素插入父节点是调用（仅保证父节点存在，但不一定已被插入到文档中）。
· `undate`：所在组件的VNode更新时调用，但是可能发生在其子VNode更新之前。
· `componentUpdated`：指令所在组件的VNode及其子VNode全部更新后调用。
· `unbind`：只调用一次，指令与元素解绑时调用
```


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
// 注册局部指令，组件中也接受一个`directives`的选项
directives: {
    focus: {
    // 指令的定义
    inserted: function(el) {
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
```markdown
 指令钩子函数会被传入一下参数
`el`: 指令所绑定的元素，可以用来直接操作DOM;
`binding`：一个对象，包含一下property：
    `name`：指令名，不包括`v-`前缀；
    `value`：指令的绑定值，例如 v-my-driective = "1+1"中，绑定值为2；
    `oldValue`: 指令绑定的前一个值，仅在update和componentUpdated钩子中可用。无论值是否改变都可用；
    `expression`：字符串形式的指令表达式。例如v-my-driective = "1+1"中，表达式为“1+1”；
    `arg`：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"；
    `modifiers`：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
`Vnode`：Vue编译生成的虚拟节点；
`oldVnode`：上一个虚拟节点，仅在update和componentUpdated钩子中可用。
```
```javascript
// 动态指令参数

```


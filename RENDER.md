### 渲染函数 & JSX
一、节点、树以及虚拟DOM
```angular2html
<div>
  <h1>my title</h1>
  content
<!--  anthor tags-->
</div>
```
当浏览器读到这些代码时，它会建立一个“DOM节点树”来保持追踪所有内容。
上述HTML对应的DOM节点树如下图所示
![img.png](img.png)
每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是一个节点。就像家谱树一样，每个节点都可以有孩子节点
也就是说每个部分可以包含其他的一部分内容。
-------------------------------------
```markdown
虚拟DOM
Vue 通过建立一个虚拟DOM来追踪自己要如何改变真实DOM。
eg:
return createElement('h1', this.blogTitle)

createElement返回：不是一个实际的DOM元素。它更准确的名字可能是createNodeDescription，因为它所包含的信息会告诉Vue
页面上需要渲染什么样的节点，包括及其子节点的描述信息。
我们把这样的节点描述为“虚拟节点”，也简写为“VNode”。虚拟DOM是我们对由Vue组件数建立起来的整个VNode树的称呼。
```
```javascript
// createElement参数
// return {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
】、  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  // 一个与模板中 attribute 对应的数据对象。可选。
  {
    // (详情见下一节)
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```
```javascript
// 深入数据对象
// 有一点要注意：如`v-bind:class`和`v-bind:style`在模板语法中会被特别对待一样，它们在VNode数据对象中也有对应的顶层字段。该对象也允许你绑定普通的HTML attribute，也允许绑定如`innerHTML`这样的DOM property。
{
  // 与`v-bind:class`的API相同
  // 接受一个字符串、对象或字符串和对象组成的数组
  `class`: {
    foo: true, 
    bar: fasle
  },
  // 与`v-bind:style`的API相同
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red'，
    fontsize: '14px'
  },
  // 普通的HTML attribute
  attrs: {
    id: 'foo'
  }，
  // 组件prop
  props: {
    myProp: 'bar'
  }，
  // DOM 属性
  domProps: {
    innerHTMl: 'baz'
  },
  // 时间监听器在`on`内，
  // 但不在支持如 `v-on:keyup.enter`这样的修饰器
  // 需要在处理函数中手动检查keyCode
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原声事件，而不是组件内部使用
  // `vm.$emit`触发的事件
  nativeOn: {
    click: this.nativeClickHandler
  }，
  // 自定义指令。注意，你无法对`binding`中的`oldValue`赋值，因为Vue已经自动为你进行了同步
  driectives: [
    {
      name: 'my-custom-dricetive',
      value: 2,
      expression: `1 + 1`,
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  //   { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需要插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层property
  key: 'myKey',
  ref: 'meRef',
  // 如果你在渲染函数中给多个元素都应用了相同的ref名
  // 那么`$refs.myRef`会变成一个数组
  refInfo: true
}
```
```javascript
// 约束
// VNode必须唯一
组件树中的所有VNode必须是唯一的
```
### 使用JS代替模板功能
#### v-if和 v-for
    只要在原生的JS中可以轻松完成的操作，Vue的渲染函数就不会提供专有的替代方法。比如，在模板中使用的v-if和v-for：
```angular2html
<ul v-if="item.length">
  <li v-for="item in items">
    {{ item.name }}
  </li>
</ul>
<p v-else>No items found.</p>

```
这些都可以在渲染函数中用javascript的if/else 和 map来重写：
```javascript
props: ['items'],
  render: function (createElement) {
  if (this.items.length) {
    return createElement('ul', this.items.map(function (item) {
      return createElement('li', item.name)
    }))
  } else {
    return createElement('p', 'No items found.')
  }
}
```
#### v-model
渲染函数中没有与v-model的直接对应，你必须自己实现响应的逻辑：
```javascript
props: ['value'],
  render: function (createElement) {
  var self = this
  return createElement('input', {
    domProps: {
      value: self.value
    },
    on: {
      input: function (event) {
        self.$emit('input', event.target.value)
      }
    }
  })
}
```
```markdown
#事件&按键修饰符
| 修饰符 | 前缀 | 描述 |
| ------ | ------ | ------ |
| .passive | & | passive=true时,表示listener永远不会调用preventDefault() |
| .capture | ! | 先执行父级的函数，再执行子级的触发函数 |
| .once	| ~ | 事件仅生效一次 | 

```
```markdown
#插槽
你可以通过`this.$slots`访问静态插槽的内容，每个插槽收拾一个VNode数组：
eg:
render: function (createElement) {
// `<div><slot></slot></div>`
return createElement('div', this.$slots.default)
}

```
```markdown
#JSx
Bable插件，用于在 Vue 中使用 JSX 语法，它可以让我们回到更接近于模板的语法上。
将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，实际上也是 JSX 所要求的。从 Vue 的 Babel 插件的 3.4.0 版本开始，我们会在以 ES2015 语法声明的含有 JSX 的任何方法和 getter 中 (不是函数或箭头函数中) 自动注入 const h = this.$createElement，这样你就可以去掉 (h) 参数了。对于更早版本的插件，如果 h 在当前作用域中不可用，应用会抛错。

```
```markdown
#函数式组件
eg:
Vue.component('my-component', {
functional: true,
// Props 是可选的
props: {
// ...
},
// 为了弥补缺少的实例
// 提供第二个参数作为上下文
render: function (createElement, context) {
// ...
}
})

组件需要的一切都是通过 context 参数传递，它是一个包括如下字段的对象：
· props：提供所有 prop 的对象
· children：VNode 子节点的数组
· slots：一个函数，返回了包含所有插槽的对象
· scopedSlots：(2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
· data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
· parent：对父组件的引用
· listeners：(2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
· injections：(2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的 property。

* 添加functional: true之后，需要我们更新我们的锚点标题组件的渲染函数，为其增加 content 参数，并将 this.$slots.default 更新为 context.children，然后将 this.level 更新为 context.props.level。


```



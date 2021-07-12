### 过滤器
过滤器可用在两个地方： 双花括号插值 和 v-bind表达式
过滤器应该被添加在JS表达式的尾部，由“管道”符号指示。
eg:
```angular2html
<!--在双花括号-->
{{ message | capitalize }}
<!--在`v-bind`中-->
<div :id="rawId | forward "></div>
```
在组件内定义过滤器 filters
在全局注册过滤器 Vue.filter:
```javascript
  // 全局过滤器
Vue.filter('capitalize', function (value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1)
    })
```
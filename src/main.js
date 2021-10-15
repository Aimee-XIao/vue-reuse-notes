import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import Toast from './components/plug/toast/index'
import * as esriLoader from 'esri-loader'
Vue.use(preview)
Vue.use(Toast)
Vue.config.productionTip = false;

// 创建一个带锚点的标题
var getChildrenTextContent = function(children) {
  return children.map(function(node) {
    console.log('node', node)
    return node.children
    ? getChildrenTextContent(node.children): node.text
  }).join('')
}

Vue.component('anchored-heading', {
  render(createElement) {
    console.log('this.$slots.default', this.$slots.default)
    // 创建  短横线隔开式 kebab-case 风格的ID
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase() // hrllo world
      .replace(/\W+/g, '-')
      .replace(/(^-|-$)/g,'')
    return createElement('h' + this.level,
      [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#' + headingId
          }
        }, this.$slots.default)
      ]
      )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

Vue.prototype.$esriLoader = esriLoader

//创建一个按钮，可以使用自定义指令

Vue.component('my-button',{
  render(createElement) {
    console.log('this.$slots.default', createElement)
    return createElement('button',
      {
        attrs: {
          name: 'my-button',
        },
        domProps: {
          innerHTML: '这是一个'+ this.title
        },
        style: {
          color: 'red',
          fontSize: '20px',
          padding: '10px',
          margin: '10px'
        },
        on: {
          click(e){
            console.log('---------------',e)
          },
        }
      }
      )
  },
  props: {
    level: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
})








Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

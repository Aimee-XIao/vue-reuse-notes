<template>
 <div class="box">
   <el-row>
     <el-col :span="3">
       <el-menu
         :default-active="'/'"
         class="el-menu-vertical-demo"
         @select="handleSelect"
         :router="true">
         <template v-for="item in menu">
           <el-menu-item :index="item.path"  :key="item.path">
             <span slot="title">{{item.name}}</span>
           </el-menu-item>
         </template>
       </el-menu>
     </el-col>
     <el-col :span="21">
       <div class="content">
         <el-breadcrumb separator-class="el-icon-arrow-right">
           <el-breadcrumb-item>{{ title }} <span style="font-size: 12px;color: #66CCCC;margin-left: 20px;">Notes → {{ noteName }}</span></el-breadcrumb-item>
         </el-breadcrumb>
         <p class="line"></p>
         <div class="content-box">
           <router-view />
         </div>
       </div>
     </el-col>
   </el-row>
 </div>
</template>


<script>
export default {
  data() {
    return {
      title:'',
      noteName:'',
      menu: [
        {
          path:'/',
          name:'混入',
          note:'MIXINNOTES.md'
        },
        {
          path:'/custom-instruction',
          name:'自定义指令',
          note:'CUSTOM.md'
        },
        {
          path:'/render-function',
          name:'渲染函数&JSX',
          note:'RENDER.md'
        },
        {
          path:'/plug-in-unit',
          name:'插件'
        },
        {
          path:'/filter',
          name:'过滤器'
        }
      ]
    }
  },
  mounted() {
    this.title = this.menu[0].name
    this.noteName = this.menu[0].note
  },
  methods: {
    handleSelect(key, keyPath) {
      this.menu.forEach(item => {
        if(item.path == keyPath){
          this.title = item.name
          this.noteName = item.note
        }
      })
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../common/base";
.box {
  width: 100%;
  height: 100%;
  background:#ffffff33;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  .content {
    height: 804px;
    margin-left: 4px;
    background-color: #ffffff54;
    border-radius: 20px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 15px;
    margin-top: 4px;
    overflow: hidden;
    div {

      margin-top: 20px;
    }
    .content-box {
      overflow: auto;
      width: 100%;
    }
    .line {
      width: 100%;
      margin-top: 20px;
      height: 1px;
      border-bottom: 1px solid $base-font-d-color;
    }
  }
}

/deep/.el-menu {
  height: 838px;
  background-color: #ffffff54;
  border-radius: 20px;
  padding: 20px 0 20px 20px;
  box-sizing: border-box;
  border: none;
  .el-menu-item:focus, .el-menu-item:hover {
    background-color: transparent;
    color: $base-font-d-color;
  }
  .is-active {
    border-radius: 20px 0 0 20px;
    background-image: linear-gradient(to right,#97ccfe,#a8b4fc);
  }
  .el-menu-item.is-active {
    color: #ffffff;
  }
  .el-menu-item, .el-submenu__title {
   text-align: left;
  }
}

</style>
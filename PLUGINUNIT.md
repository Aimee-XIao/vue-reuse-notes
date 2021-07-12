### 插件学习笔记
插件通常用来为Vue添加全局功能
使用：
    通过全局方法Vue.use()使用插件。需要在在调用new Vue()启动应用之前完成
开发：
    Vue.js的插件应该暴露一个install方法。这个方法的第一个参数是Vue构造器，第二个参数是一个可选的选项对象
    Demo-------》 vue-reuse\src\components\plug\toast

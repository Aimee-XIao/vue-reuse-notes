import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path:'/',
        component: ()=> import('../views/mixin')
      },
      {
        path:'/custom-instruction',
        component: ()=> import('../views/custom-instruction')
      },
      {
        path:'/render-function',
        component: ()=> import('../views/render-function')
      },
      {
        path:'/plug-in-unit',
        component: ()=> import('../views/plug-in-unit')
      },
      {
        path:'/filter',
        component: ()=> import('../views/filter')
      }
    ]
  },


];

const router = new VueRouter({
  routes,
});

export default router;

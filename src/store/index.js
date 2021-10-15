import Vue from "vue";
import Vuex from "vuex";
import mapConfig from './modules/map'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {
    mapOption: state => { return state.mapConfig.option}
  },
  modules: {
    mapConfig
  },
});

export default  {
  state: {
    map: null,
    view: null,
    layerCount: 0,
    option: {
      url: 'http://localhost:8087/arcgis_js_v414_api/arcgis_js_api/library/4.14/init.js',
      css: 'http://localhost:8087/arcgis_js_v414_api/arcgis_js_api/library/4.14/esri/css/main.css'
    }
  },
  mutations: {
    initMap(state, payload) {
      state.map = payload;
    },
    initView(state, payload) {
      state.view = payload;
    },
  },
  actions: {

  }
}
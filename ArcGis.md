```markdown
esri/WebMap
1、WebMap 是从 Arcgis onLine 或者 Arcgis for portal item 上获取显示到用户的界面中。
  *Arcgis for portal item: 用于门户项目的arcgis
用法：
  需要一个地图id，
  创建一个新的网络地图需要设置id号，然后在用地图底图MapView或者SecenceView显示出来
  ```JavaScript

    const webmap = new WebMap({
      portalItem: {
        id:'459a495fc16d4d4caa35e92e895694c8'
      }
    })

    const view = new MapView({
      container: 'map',
      map: webmap
    })
    
  ```
创建 MapImageLayer 实例，您必须将url属性设置为地图服务中图层的 REST 端点

```
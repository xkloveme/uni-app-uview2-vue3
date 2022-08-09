/*
 * 异步创建script标签,加载amap地图
 */
export default function MapLoader(key) {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var script = document.createElement('script')
      const key = '4c16a357fd34a09ad354f0c2f7527e75'
      // const key = "3f2c32d72f50f705fb2d053d4bec1ef0";
      const plugin =
        'AMap.DistrictSearch,AMap.RangingTool,AMap.Geolocation,AMap.ElasticMarker,AMap.LabelsLayer'
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://webapi.amap.com/maps?v=2.0&callback=initAMap&key=${key}&plugin=${plugin}`
      script.onerror = reject
      document.head.appendChild(script)
    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}

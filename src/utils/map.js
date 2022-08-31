/*
 * 异步创建script标签,加载amap地图
 */
export default function MapLoader(key) {
  // 安全密钥
  window._AMapSecurityConfig = {
    securityJsCode: '5fda8c0e32f2bc0ef9025dcb12ace754',
  }
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var script = document.createElement('script')
      // key
      const key = 'a08a2a3e54269dffd35f5ec9191fcfaa'
      const plugin =
        'ElasticMarker,AMap.DistrictSearch,AMap.RangingTool,AMap.Geolocation,AMap.LabelsLayer'
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://webapi.amap.com/maps?v=1.4.15&callback=initAMap&key=${key}&plugin=${plugin}`
      script.onerror = reject
      document.head.appendChild(script)
    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}

<template>
  <div id="MAps" style="width: 100vw; height: 100vh; pointer-events: auto"></div>
  <div fixed top-25 left-5 flex flex-col>
    <div v-for="(cr, key) of color" :key="key" flex-center class="text-sm" :style="{ color: cr }">
      <img :src="`https://hltm.jw.linan.gov.cn/linanjiwei/jsjw/img/${key}.png`" w-3 h-4 m-1 mb-1 />
      {{ key }}
    </div>
  </div>
  <div fixed bottom-16 right-5 flex flex-col>
    <uni-icons
      type="settings-filled"
      bg="light-50"
      :size="app.Global.FontSizeNum == 16 ? 25 : 40"
      shadow-xl
      p-1
      rounded-100
      color="#666"
      @click="showLine"
    ></uni-icons>
    <uni-icons
      type="navigate-filled"
      bg="light-50"
      :size="app.Global.FontSizeNum == 16 ? 25 : 40"
      shadow-xl
      p-1
      my-2
      rounded-100
      color="#666"
      @click="location"
    ></uni-icons>
    <uni-icons
      :size="app.Global.FontSizeNum == 16 ? 25 : 40"
      type="reload"
      color="#666"
      bg="light-50"
      shadow-xl
      p-1
      rounded-100
      @click="reset"
    ></uni-icons>
  </div>
  <uni-popup ref="popup" background-color="#0000" @change="change">
    <uni-card :is-shadow="true">
      <template #title>
        <view flex flex-col>
          <view flex>
            <img
              :src="
                item.fileUrl || '//store.is.autonavi.com/showpic/cf623a546cdbcf6c8cfc35c392106283'
              "
              w-10
              h-10
              m-2
              mb-1
            />
            <view flex flex-col mx-2 mt-2 w-full>
              <view font-900 class="text-base" flex-center justify="between">
                <text @click="handleGo(item)">{{ item.name }}</text>
                <uni-icons
                  type="closeempty"
                  self=""
                  size="18"
                  color="#666"
                  @click="close"
                ></uni-icons>
              </view>
              <view>
                <uni-tag :text="item.line" type="error" size="small"></uni-tag>
              </view>
            </view>
          </view>
          <view flex color="#666" font-200>
            <uni-icons type="location" size="18" color="#666"></uni-icons>
            {{ item.address }} | {{ distance || '-' }}公里
          </view>
        </view>
      </template>
      <view class="text-cut-2 text-sm" @click="handleGo(item)">
        {{ item.intro }}
      </view>
      <view flex color="#3089FF" mt-2>
        <view v-if="item.phone" flex-center @click="PhoneCall(item.phone)">
          <uni-icons
            type="phone-filled"
            :size="app.Global.FontSizeNum == 16 ? 18 : 22"
            color="#3089FF"
          ></uni-icons>
          <text class="text-base mx-0.5">拨打</text>
        </view>
        <view v-if="app.Global.GetTicketId == ''" flex-center mx-6 @click="openPopup(item)">
          <uni-icons
            type="navigate-filled"
            :size="app.Global.FontSizeNum == 16 ? 18 : 22"
            color="#3089FF"
          ></uni-icons>
          <text class="text-base mx-0.5">导航</text>
        </view>
        <view flex-center @click="handleGo(item)">
          <uni-icons
            type="bars"
            :size="app.Global.FontSizeNum == 16 ? 18 : 22"
            color="#3089FF"
          ></uni-icons>
          <text class="text-base mx-0.5">查看详情</text>
        </view>
      </view>
    </uni-card>
    <view w-full h-4></view>
    <SelectMap ref="selectMapPopup" :lnglat="lnglat" :addr="addr" />
  </uni-popup>
</template>

<script setup name="Map">
import $api from '@/api'
import SelectMap from '@/components/SelectMap'
import MapLoader from '@/utils/map.js'

let MAps = null
let district = null
let item = ref({})
let popup = ref(null)
function PhoneCall(num) {
  if (!num) {
    return uni.showToast({
      icon: 'none',
      title: '暂未提供电话',
    })
  }
  /* eslint handle-callback-err: "warn" */
  ZWJSBridge.onReady(() => {
    console.log('初始化完成后，执行bridge方法')
    ZWJSBridge.phoneCall({
      corpId: num,
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        uni.makePhoneCall({
          phoneNumber: num,
        })
        console.log(error)
      })
  })
}
function handleGo(item) {
  app.to('/pages/culture/mapDetail', { detailId: item.id, distance: distance.value })
}
let selectMapPopup = ref(null)
let lnglat = ref([])
let addr = ref('')
function openPopup(item) {
  lnglat.value = [item.longitude, item.latitude]
  addr.value = item.address
  selectMapPopup.value.toggle()
}
function toggle() {
  popup.value.open('bottom')
}
function close() {
  popup.value.close()
}
let layer = null
let spots = []
function logMapinfo() {
  let zoom = MAps.getZoom()
  if (zoom < 10) {
    spots.map(item => item.show())
    layer.setzIndex(1)
  } else {
    spots.map(item => item.hide())
    layer.setzIndex(9999)
  }
}
let isline = ref(false)
// 显示隐藏line
function showLine() {
  if (isline.value) {
    polyline1?.hide()
    polyline2?.hide()
    polyline3?.hide()
    polyline4?.hide()
    isline.value = false
  } else {
    getDataLine()
    isline.value = true
  }
}
function initMaps() {
  // 配置地图的基本显示
  MAps = new AMap.Map('MAps', {
    turboMode: false,
    showIndoorMap: false,
    defaultCursor: 'pointer',
    showBuildingBlock: false,
    showLabel: false,
    zoom: 9,
    features: ['bg', 'point'],
    center: ['120.84559', '31.09993'], // 初始化地图中心点
  })
  MAps.on('moveend', logMapinfo)

  layer = new AMap.LabelsLayer({
    zooms: [3, 20],
    zIndex: 3,
    collision: false,
    allowCollision: true,
  })
  MAps.add(layer)
  location()
  addBoundary('嘉善县', '#3493FF', '#1498FF')
  addBoundary('吴江区', '#FFB41F', '#FFB41F')
  addBoundary('青浦区', '#2AAE33', '#2AAE33')
}
let touristSpots = [
  {
    name: '嘉善县',
    position: [120.999, 30.85],
    center: [120.92, 30.85],
  },
  {
    name: '吴江区',
    position: [120.768, 31.0598],
    center: [120.638, 31.0598],
  },
  {
    name: '青浦区',
    position: [121.12, 31.05],
    center: [121.12, 31.15],
  },
]
let polyline1 = null
let polyline2 = null
let polyline3 = null
let polyline4 = null
// 添加line
function getDataLine() {
  $api
    .getLinePointsDetail({
      line: app.User.line,
    })
    .then(res => {
      if (res.code == 200) {
        let line1 = []
        let line2 = []
        let line3 = []
        let line4 = []
        line1 = res.data['清廉传承线']
        line2 = res.data['清廉实践线']
        line3 = res.data['清廉教育线']
        line4 = res.data['红色文化线']
        polyline1 = new AMap.Polyline({
          path: line1,
          geodesic: true,
          lineJoin: 'round',
          showDir: true,
          dirColor: 'white',
          strokeColor: '#FF9D01',
          outlineColor: 'white',
          isOutline: true,
          strokeWeight: app.Global.FontSizeNum == 16 ? 2 : 5,
        })
        polyline2 = new AMap.Polyline({
          path: line2,
          geodesic: true,
          lineJoin: 'round',
          showDir: true,
          dirColor: 'white',
          strokeColor: '#7F2D00',
          outlineColor: 'white',
          isOutline: true,
          strokeWeight: app.Global.FontSizeNum == 16 ? 2 : 5,
        })
        polyline3 = new AMap.Polyline({
          path: line3,
          geodesic: true,
          lineJoin: 'round',
          showDir: true,
          dirColor: 'white',
          strokeColor: '#0000FF',
          outlineColor: 'white',
          isOutline: true,
          strokeWeight: app.Global.FontSizeNum == 16 ? 2 : 5,
        })
        polyline4 = new AMap.Polyline({
          path: line4,
          geodesic: true,
          lineJoin: 'round',
          showDir: true,
          dirColor: 'white',
          strokeColor: '#FF0000',
          outlineColor: 'white',
          isOutline: true,
          strokeWeight: app.Global.FontSizeNum == 16 ? 2 : 5,
        })
        MAps.add([polyline1, polyline2, polyline3, polyline4])
      }
    })
}
// 添加count
function addCountText() {
  $api
    .getMapCount({
      longitude: app.User.locationArr[0],
      latitude: app.User.locationArr[1],
      name: app.User.name,
      area: app.User.area,
      line: app.User.line,
    })
    .then(res => {
      MAps?.remove(spots)
      spots = []
      let obj = {}
      res.data.map(item => {
        obj[item.area] = item.count || 0
      })
      addText(obj)
    })
}

function getDataMap(needPoint = false) {
  addCountText()
  $api
    .getMapPoints({
      page: 1,
      size: 10000,
      longitude: app.User.locationArr[0],
      latitude: app.User.locationArr[1],
      name: app.User.name,
      area: app.User.area,
      line: app.User.line,
    })
    .then(res => {
      layer?.clear()
      addMarker(res.rows, needPoint)
    })
  if (polyline1) {
    switch (app.User.line) {
      case '清廉传承线':
        isline.value && polyline1?.show()
        polyline2?.hide()
        polyline3?.hide()
        polyline4?.hide()
        break
      case '清廉实践线':
        polyline1?.hide()
        isline.value && polyline2?.show()
        polyline3?.hide()
        polyline4?.hide()
        break
      case '清廉教育线':
        polyline1?.hide()
        polyline2?.hide()
        isline.value && polyline3?.show()
        polyline4?.hide()
        break
      case '红色文化线':
        polyline1?.hide()
        polyline2?.hide()
        polyline3?.hide()
        isline.value && polyline4?.show()
        break
      default:
        isline.value && polyline1?.show()
        isline.value && polyline2?.show()
        isline.value && polyline3?.show()
        isline.value && polyline4?.show()
        break
    }
  }
}
let color = {
  场馆: '#4a60ff',
  村居: '#13ba2f',
  公园: '#b351fe',
  学校: '#ff8617',
}
function addMarker(rows, needPoint = false) {
  let markers = []
  // 图层添加到地图
  rows?.map(item => {
    let LabelsData = {
      name: item.name,
      extData: { id: item.id },
      position: [item.longitude, item.latitude],
      zooms: [10, 21],
      opacity: 1,
      zIndex: 1000,
      collision: false,
      allowCollision: true,
      icon: {
        // 图标类型，现阶段只支持 image 类型
        type: 'image',
        // 图片 url
        image: `https://hltm.jw.linan.gov.cn/linanjiwei/jsjw/img/${item.type}.png`,
        // 图片尺寸
        size: app.Global.FontSizeNum == 16 ? [15, 18] : [20, 23],
        // 图片相对 position 的锚点，默认为 bottom-center
        anchor: 'center',
      },
      text: {
        content: item.name,
        direction: 'bottom',
        zooms: [12, 21],
        style: {
          fontSize: app.Global.FontSizeNum == 16 ? 12 : 25,
          fontWeight: 'normal',
          fillColor: color[item.type],
          strokeColor: '#fff',
          strokeWidth: app.Global.FontSizeNum == 16 ? 2 : 5,
          fold: true,
          padding: '2, 5',
        },
      },
    }
    var labelMarker = new AMap.LabelMarker(LabelsData)
    labelMarker.on('click', () => showInfoM(labelMarker))
    markers.push(labelMarker)
  })
  // 将 marker 添加到图层
  layer?.add(markers)
  if (rows.length && needPoint) {
    if (app.User.area) {
      let position = touristSpots.filter(item => item.name.includes(app.User.area))
      MAps.setZoomAndCenter(10, position?.[0].position)
    } else if (app.User.name) {
      MAps.setZoomAndCenter(15, [rows[0].longitude, rows[0].latitude])
    } else {
      reset()
    }
  }
}
let distance = ref('')
function showInfoM(e) {
  MAps.setZoomAndCenter(15, e.De.position)
  $api.getPointsDetail(e.w.extData.id).then(res => {
    item.value = res.data
    item.value['fileUrl'] = res.data?.thumbnail?.url
    var p1 = app.User.locationArr
    var p2 = [res.data.longitude, res.data.latitude]
    // 返回 p1 到 p2 间的地面距离，单位：米
    var dis = AMap.GeometryUtil.distance(p1, p2)
    distance.value = p1.length ? (dis / 1000).toFixed(2) : ''
    toggle()
  })
}

function addBoundary(name = '嘉善县', fillColor = '#CCF3FF', strokeColor = '#CC66CC') {
  if (!district) {
    //实例化DistrictSearch
    district = new AMap.DistrictSearch({
      subdistrict: 0, //获取边界不需要返回下级行政区
      extensions: 'all', //返回行政区边界坐标组等具体信息
      level: 'district', //查询行政级别为 市
    })
  }

  district.search(name, function (status, result) {
    if (JSON.stringify(result) !== '{}') {
      // 获取朝阳区的边界信息
      var bounds = result.districtList[0].boundaries
      var polygons = []
      if (bounds) {
        for (var i = 0, l = bounds.length; i < l; i++) {
          //生成行政区划polygon
          var polygon = new AMap.Polygon({
            map: MAps,
            strokeWeight: 1,
            path: bounds[i],
            fillOpacity: 0.3,
            fillColor: fillColor,
            strokeColor: strokeColor,
            strokeStyle: 'dashed',
          })
          polygons.push(polygon)
        }
      }
      // 地图自适应
      // MAps.setFitView()
    }
  })
}

function addText(obj) {
  for (var i = 0; i < touristSpots.length; i += 1) {
    let marker = new AMap.Marker({
      position: touristSpots[i].position,
      extData: touristSpots[i].center,
      offset: new AMap.Pixel(-10, -10),
      clickable: true,
      bubble: true,
      anchor: 'center',
      content: `
               <div class="marker-all">
                  <div >${obj[touristSpots[i].name] || 0}
                  </div>
                   <div class="marker-title">${touristSpots[i].name}</div>
               </div>
               `,
    })
    marker.on('click', onMapClick)
    spots.push(marker)
  }
  MAps?.add(spots)
}

function onMapClick(e) {
  MAps.setZoomAndCenter(10.2, e.target.De.extData)
}

function location() {
  // 原生定位
  uni.getLocation({
    type: 'wgs84',
    success: function (res) {
      console.log('当前位置的经度：' + res.longitude)
      console.log('当前位置的纬度：' + res.latitude)
      app.User.addLocation([res.longitude, res.latitude])
      uni.showToast({ icon: 'none', title: '获取地图定位成功' })
    },
    fail: function (err) {
      console.log(err)
      uni.showToast({ icon: 'none', title: '获取地图定位失败' })
    },
  })
  // 浙里办定位
  // ZWJSBridge.onReady(() => {
  //   ZWJSBridge.getLocation()
  //     .then(result => {
  //       console.log('当前位置的经度：' + result.longitude)
  //       console.log('当前位置的纬度：' + result.latitude)
  //       app.User.addLocation([result.longitude, result.latitude])
  //       uni.showToast({ icon: 'none', title: '获取地图定位成功' })
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       uni.showToast({ icon: 'none', title: '获取地图定位失败' })
  //     })
  // })
  // 高德定位
  // AMap.plugin('AMap.Geolocation', function () {
  //   var geolocation = new AMap.Geolocation({
  //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
  //     timeout: 10000, //超过10秒后停止定位，默认：5s
  //     position: 'RB', //定位按钮的停靠位置
  //     offset: [20, 100], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
  //     zoomToAccuracy: false, //定位成功后是否自动调整地图视野到定位点
  //   })
  //   geolocation.getCurrentPosition(function (status, result) {
  //     if (status == 'complete') {
  //       let position = new AMap.LngLat(120.84559, 31.09993) // 标准写法
  //       app.User.addLocation([result.position.lng, result.position.lat])
  //       setTimeout(() => {
  //         MAps.setZoomAndCenter(9, position)
  //       }, 2000)
  //     } else {
  //       uni.showToast({ icon: 'none', title: '地图定位失败' })
  //     }
  //   })
  //   MAps.addControl(geolocation)
  // })
}
function reset() {
  let position = new AMap.LngLat(120.84559, 31.09993) // 标准写法
  MAps.setZoomAndCenter(9, position)
  addCountText()
}
onBeforeMount(() => {
  MapLoader().then(
    () => {
      getDataMap()
      nextTick(() => {
        initMaps()
      })
    },
    e => {
      console.log('地图加载失败', e)
    },
  )
})
defineExpose({
  getDataMap,
})
</script>

<style lang="scss" scoped>
.icon {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}

#MAps {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

:deep(.marker-all) {
  color: #ff8800;
  width: 2rem;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  font-weight: 900;
  background: url(@/static/img/4.png) center/100% 100% no-repeat;
}

:deep(.marker-title) {
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: -2rem;
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.6);
}
</style>

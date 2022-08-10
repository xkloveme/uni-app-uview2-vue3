<template>
  <div id="MAps" style="width: 100vw; height: 95vh"></div>
  <uni-popup ref="popup" background-color="#0000" @change="change">
    <uni-card :is-shadow="true">
      <template #title>
        <view flex>
          <img
            src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
            w-10
            h-10
            m-2
            mb-1
          />
          <view flex flex-col w-full ml-2 mt-2>
            <view flex-center justify="between">
              <view>
                <text font-900 class="text-base">{{ item.name }}</text>
                <span ml-3 bg="red-500" color="#fff" px-2 class="text-sm text-center">
                  {{ item.line }}
                </span>
              </view>
              <uni-icons
                type="closeempty"
                self=""
                size="18"
                color="#666"
                @click="close"
              ></uni-icons>
            </view>
            <view flex color="#666" font-normal>
              <uni-icons type="location" size="18" color="#666"></uni-icons>
              {{ item.address }} | {{ distance || '-' }}公里
            </view>
          </view>
        </view>
      </template>
      <view class="text-cut-2">
        {{ item.intro }}
      </view>
      <view flex color="#3089FF" mt-2>
        <view flex-center @click="PhoneCall(item.phone)">
          <uni-icons type="phone-filled" size="18" color="#3089FF"></uni-icons>
          <text mx-2>拨打</text>
        </view>
        <view flex-center mx-6 @click="openPopup(item)">
          <uni-icons type="navigate-filled" size="18" color="#3089FF"></uni-icons>
          <text mx-2>导航</text>
        </view>
        <view flex-center @click="handleGo(item)">
          <uni-icons type="bars" size="18" color="#3089FF"></uni-icons>
          <text mx-2>查看详情</text>
        </view>
      </view>
    </uni-card>
    <view w-full h-10></view>
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
  uni.makePhoneCall({
    phoneNumber: num,
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
function initMaps() {
  // 配置地图的基本显示
  MAps = new AMap.Map('MAps', {
    resizeEnable: true, // 是否监控地图容器尺寸变化
    showLabel: false,
    zoom: 9,
    center: ['120.92559', '30.99993'], // 初始化地图中心点
  })
  addBoundary('嘉善县', '#3493FF', '#1498FF')
  addBoundary('吴江区', '#FFB41F', '#FFB41F')
  addBoundary('青浦区', '#2AAE33', '#2AAE33')
  location()
  layer = new AMap.LabelsLayer({
    zooms: [3, 20],
    zIndex: 1000,
    allowCollision: true, //可以让标注避让用户的标注
  })
  MAps.add(layer)
  $api.getMapCount().then(res => {
    let obj = {}
    res.data.map(item => {
      obj[item.area] = item.count
    })
    addText(obj)
  })
}

function getDataMap() {
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
      layer.clear()
      addMarker(res.rows)
    })
}
let color = {
  场馆: '#4a60ff',
  村: '#13ba2f',
  园: '#b351fe',
  陵园: '#ff1714',
  学校: '#ff8617',
}
function addMarker(rows) {
  let markers = []
  // 图层添加到地图
  rows?.map(item => {
    let LabelsData = {
      name: item.name,
      extData: { id: item.id },
      position: [item.longitude, item.latitude],
      zooms: [11, 20],
      opacity: 1,
      zIndex: 1000,
      icon: {
        // 图标类型，现阶段只支持 image 类型
        type: 'image',
        // 图片 url
        image: `http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/img/${item.type}.png`,
        // 图片尺寸
        size: [30, 40],
        // 图片相对 position 的锚点，默认为 bottom-center
        anchor: 'center',
      },
      text: {
        content: item.name,
        direction: 'bottom',
        style: {
          fontSize: 12,
          fontWeight: 'normal',
          fillColor: color[item.type],
          strokeColor: '#fff',
          strokeWidth: 2,
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
  layer.add(markers)
}
let distance = ref('')
function showInfoM(e) {
  $api.getPointsDetail(e._opts.extData.id).then(res => {
    item.value = res.data
    var p1 = app.User.locationArr
    var p2 = [res.data.longitude, res.data.latitude]
    // 返回 p1 到 p2 间的地面距离，单位：米
    var dis = AMap.GeometryUtil.distance(p1, p2)
    distance.value = (dis / 1000).toFixed(2)
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
  let touristSpots = [
    {
      name: '嘉善',
      count: 0,
      position: [120.92, 30.85],
      zIndex: 300,
      smallIcon: 'https://a.amap.com/jsapi_demos/static/resource/img/qiniandian.png',
      bigIcon: 'https://a.amap.com/jsapi_demos/static/resource/img/qiniandian.png',
      size: [128, 160],
      anchor: 'bottom-center',
    },
    {
      name: '吴江',
      count: 0,
      position: [120.638, 31.0598],
      zIndex: 300,
      smallIcon: 'https://a.amap.com/jsapi_demos/static/resource/img/men3.png',
      bigIcon: 'https://a.amap.com/jsapi_demos/static/resource/img/men.png',
      size: [146, 144],
      anchor: 'bottom-center',
    },
    {
      name: '青浦',
      count: 0,
      position: [121.12, 31.15],
      zIndex: 300,
      smallIcon: 'https://a.amap.com/jsapi_demos/static/resource/img/men2.png',
      bigIcon: 'https://a.amap.com/jsapi_demos/static/resource/img/men2.png',
      size: [185, 94],
      anchor: 'bottom-center',
    },
  ]

  var spots = []
  var zoomStyleMapping2 = {
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    14: 0,
    15: 0,
    16: 0,
  }
  for (var i = 0; i < touristSpots.length; i += 1) {
    let lableName = touristSpots[i].name + '&nbsp;&nbsp;' + obj[touristSpots[i].name]
    var marker = new AMap.ElasticMarker({
      position: touristSpots[i].position,
      zooms: [7, 20],
      styles: [
        {
          icon: {
            img: touristSpots[i].smallIcon,
            size: [50, 50], //可见区域的大小
            anchor: 'bottom-center', //锚点
            fitZoom: 10, //最合适的级别
            scaleFactor: 2, //地图放大一级的缩放比例系数
            maxScale: 2, //最大放大比例
            minScale: 1, //最小放大比例
          },
          label: {
            content: lableName,
            position: 'BM',
            minZoom: 3,
            fitZoom: 10, //最合适的级别
            scaleFactor: 2, //地图放大一级的缩放比例系数
            maxScale: 2, //最大放大比例
            minScale: 1, //最小放大比例
          },
        },
      ],
      zoomStyleMapping: zoomStyleMapping2,
    })
    marker.on('click', () => MAps.setZoom(12))
    spots.push(marker)
  }
  MAps.add(spots)
}

function location() {
  AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 10000, //超过10秒后停止定位，默认：5s
      position: 'RB', //定位按钮的停靠位置
      offset: [20, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
      zoomToAccuracy: false, //定位成功后是否自动调整地图视野到定位点
    })
    geolocation.getCurrentPosition(function (status, result) {
      if (status == 'complete') {
        let position = new AMap.LngLat(120.92559, 30.99993) // 标准写法
        app.User.addLocation([result.position.lng, result.position.lat])
        setTimeout(() => {
          MAps.setZoomAndCenter(9, position)
        }, 2000)
      } else {
        uni.showToast({ icon: 'none', title: '地图定位失败' })
      }
    })
    MAps.addControl(geolocation)
  })
}
onMounted(() => {
  MapLoader().then(
    AMap => {
      initMaps()
      getDataMap()
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
</style>

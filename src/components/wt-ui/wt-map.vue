<template>
  <div id="MAps" style="width: 100vw; height: 95vh" @click="toggle"></div>
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
          <view flex flex-col ml-2 mt-2>
            <view flex-center justify="between">
              <view>
                <text font-900 class="text-base">吴镇纪念馆</text>
                <span ml-3 bg="red-500" color="#fff" px-2 class="text-sm text-center">
                  清廉教育线
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
              嘉善县魏塘街道花园路178号 | 5公里
            </view>
          </view>
        </view>
      </template>
      <view class="text-cut-2">
        吴镇纪念馆于2000年8地址位于嘉善县魏塘街道花园路178号地址位于嘉善县魏塘街道花园路178号地址位于嘉善县魏塘街道花园路178号地址位于嘉善县魏塘街道花园路178号地址位于嘉善县魏塘街道花园路178号月建成，地址位于嘉善县魏塘街道花园路178号，是为了纪念元代四大画家之
      </view>
      <view flex color="#3089FF" mt-2>
        <view flex-center @click="actionsClick('分享')">
          <uni-icons type="phone-filled" size="18" color="#3089FF"></uni-icons>
          <text mx-2>拨打</text>
        </view>
        <view flex-center mx-6 @click="actionsClick('点赞')">
          <uni-icons type="navigate-filled" size="18" color="#3089FF"></uni-icons>
          <text mx-2>导航</text>
        </view>
        <view flex-center @click="actionsClick('评论')">
          <uni-icons type="bars" size="18" color="#3089FF"></uni-icons>
          <text mx-2>查看详情</text>
        </view>
      </view>
    </uni-card>
    <view w-full h-10></view>
  </uni-popup>
</template>

<script setup name="Map">
import MapLoader from '@/utils/map.js'
let MAps = null
let district = null

let popup = ref(null)
function toggle() {
  popup.value.open('bottom')
}
function close() {
  popup.value.close()
}
function initMaps() {
  // 配置地图的基本显示
  MAps = new AMap.Map('MAps', {
    resizeEnable: true, // 是否监控地图容器尺寸变化
    showLabel: false,
    zoom: 10, // 初始化地图层级120.92559,30.82993
    center: ['120.92559', '30.82993'], // 初始化地图中心点
  })
  addBoundary('嘉善县', '#3493FF', '#1498FF')
  addBoundary('吴江区', '#FFB41F', '#FFB41F')
  addBoundary('青浦区', '#2AAE33', '#2AAE33')
  location()
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
function location() {
  AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 10000, //超过10秒后停止定位，默认：5s
      position: 'RB', //定位按钮的停靠位置
      offset: [20, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
      zoomToAccuracy: false, //定位成功后是否自动调整地图视野到定位点
    })
    MAps.addControl(geolocation)
    geolocation.getCurrentPosition(function (status, result) {
      if (status == 'complete') {
        console.log(
          '🐛 ~ file: wt-map.vue ~ line 68 ~ geolocation.getCurrentPosition ~ result',
          result,
        )
        app.User.addLocation([result.position.lng, result.position.lat])
        // onComplete(result)
      } else {
        uni.showToast({ icon: 'none', title: '地图定位失败' })
      }
    })
  })
}
onMounted(() => {
  MapLoader().then(
    AMap => {
      initMaps()
    },
    e => {
      console.log('地图加载失败', e)
    },
  )
})
</script>

<style lang="scss">
.icon {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}
</style>

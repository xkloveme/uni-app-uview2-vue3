<template>
  <uni-popup ref="popupSelect" background-color="#fff" @change="change">
    <view w-full>
      <div target="_blank" decoration-none text-lg my-2 flex-center @click="close('baidu')">
        <img src="@/static/img/百度地图.png" w-10 h-10 m-2 mb-1 />
        <div color="#666">百度地图</div>
      </div>
      <hr color="#f0f0f0" />
      <div target="_blank" decoration-none text-lg my-2 flex-center @click="close('amap')">
        <img src="@/static/img/高德地图.png" w-10 h-10 m-2 mb-1 />
        <div color="#666">高德地图</div>
      </div>
      <hr color="#f0f0f0" />
      <div target="_blank" flex-center decoration-none text-lg my-2 @click="close('qqmap')">
        <img src="@/static/img/腾讯地图.png" w-10 h-10 m-2 mb-1 />
        <div color="#666">腾讯地图</div>
      </div>
      <hr color="#f0f0f0" />
    </view>
    <view w-full flex-center h-20 text-lg @click="close()">取消</view>
  </uni-popup>
</template>

<script setup>
/**
 * Desc 跳转第三方地图
 * @property {String} lnglat 经纬度
 * @property {String} addr 地址
 */
const props = defineProps({
  lnglat: {
    type: Array,
    default: () => [],
  },
  addr: {
    type: String,
    default: '',
  },
})
let lnglatStr = $computed(() => {
  let b = JSON.parse(JSON.stringify(props.lnglat))
  return b.join(',')
})
let latlngStr = $computed(() => {
  let c = JSON.parse(JSON.stringify(props.lnglat)).reverse()
  return c
})
let popupSelect = ref(null)
function toggle() {
  // popupSelect.value.open('bottom')
  nextTick(() => {
    Callback()
  })
}
function close(mapType) {
  mapType && Callback(mapType)
  popupSelect.value.close()
}

// URL Scheme
const u = navigator.userAgent
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
let proto = ''
function Callback(mapType) {
  ZWJSBridge.onReady(() => {
    ZWJSBridge.openLink({
      url: `zwfw://openThirdMap?longitude=${props.lnglat[0]}&latitude=${props.lnglat[1]}&locationName=${props.addr}`,
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        uni.showToast({ icon: 'none', title: '暂不支持微信端和支付宝端,请在浙里办APP操作' })
        console.log(error)
      })
    // ZWJSBridge.getUUID()
    //   .then(data => {
    //     if (data.success) {
    //       // 在浙里办环境
    //       ZWJSBridge.openLink({
    //         url: `zwfw://openThirdMap?longitude=${latlngStr[0]}&latitude=${latlngStr[1]}&locationName=${props.addr}`,
    //       })
    //     } else {
    //       if (mapType === 'baidu') {
    //         // IOS参考地址: https://lbsyun.baidu.com/index.php?title=uri/api/ios
    //         // Android参考地址: https://lbsyun.baidu.com/index.php?title=uri/api/android
    //         proto = isiOS
    //           ? `baidumap://map/direction?src=ios.baidu.openAPIdemo&destination=${props.addr}&region=${props.addr}`
    //           : `bdapp://map/direction?src=andr.baidu.openAPIdemo&destination=${props.addr}&region=${props.addr}`
    //         window.location.href = proto
    //       } else if (mapType === 'amap') {
    //         // IOS参考地址: https://lbs.amap.com/api/amap-mobile/guide/ios/navi
    //         // Android参考地址:  https://lbs.amap.com/api/amap-mobile/gettingstarted
    //         proto = isiOS
    //           ? `iosamap://navi?sourceApplication=applicationName&poiname=${props.addr}&poiid=BGVIS&lat=${latlngStr[0]}&lon=${latlngStr[1]}&dev=1&style=2`
    //           : `androidamap://navi?sourceApplication=appname&poiname=${props.addr}&lat=${latlngStr[0]}&lon=${latlngStr[1]}&dev=1&style=2`
    //         window.location.href = proto
    //       } else if (mapType === 'qqmap') {
    //         // IOS 和 Android 一样 参考地址:https://lbs.qq.com/webApi/uriV1/uriGuide/uriMobileRoute
    //         proto = `qqmap://map/routeplan?type=drive&to=${props.addr}&tocoord=${latlngStr}&referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`
    //         window.location.href = proto
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  })
}

defineExpose({
  toggle,
})
</script>

<style lang="scss"></style>

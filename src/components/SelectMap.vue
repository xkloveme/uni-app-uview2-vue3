<template>
  <uni-popup ref="popupSelect" background-color="#fff" @change="change">
    <view w-full>
      <a
        :href="`http://api.map.baidu.com/marker?location=${latlngStr}&title=${addr}&output=html`"
        target="_blank"
        decoration-none
        text-lg
        flex-center
      >
        <img src="@/static/img/百度地图.png" w-10 h-10 m-2 mb-1 />
        <div color="#666">百度地图</div>
      </a>
      <hr color="#f0f0f0" />
      <a
        :href="`https://uri.amap.com/marker?position=${lnglatStr}&name=${addr}&src=mypage&coordinate=gaode&callnative=1`"
        target="_blank"
        decoration-none
        text-lg
        flex-center
      >
        <img src="@/static/img/高德地图.png" w-10 h-10 m-2 mb-1 />
        <div color="#666">高德地图</div>
      </a>
      <hr color="#f0f0f0" />
      <a
        :href="`https://apis.map.qq.com/uri/v1/geocoder?coord=${latlngStr}&amp;referer=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77`"
        target="_blank"
        flex-center
        decoration-none
        text-lg
      >
        <img src="@/static/img/腾讯地图.png" w-10 h-10 m-2 mb-1 />
        <div color="#666">腾讯地图</div>
      </a>
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
    default: '未知',
  },
})
let lnglatStr = $computed(() => {
  let b = JSON.parse(JSON.stringify(props.lnglat))
  return b.join(',')
})
let latlngStr = $computed(() => {
  let c = JSON.parse(JSON.stringify(props.lnglat)).reverse()
  return c.join(',')
})
let popupSelect = ref(null)
function toggle() {
  popupSelect.value.open('bottom')
}
function close() {
  popupSelect.value.close()
}
defineExpose({
  toggle,
})
</script>

<style lang="scss"></style>

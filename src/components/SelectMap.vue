<template>
  <uni-popup ref="popup" background-color="#0000" @change="change">
    <view w-full h-10>
      <img
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
        w-10
        h-10
        m-2
        mb-1
      />
      <text>百度地图</text>
    </view>
    <view w-full h-10></view>
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
</script>

<style lang="scss"></style>

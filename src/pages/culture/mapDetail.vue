<template>
  <meta title="点位详情" />
  <uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
    <swiper class="swiper-box" h-50 @change="change">
      <swiper-item v-for="(item, index) in info" :key="index">
        <view class="swiper-item">
          <img :src="item.content" w-full h-full />
        </view>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
  <view bg="light-50" rounded-lg px-2 pt-2 fixed top-50 left-0 right-0 h-full>
    <view flex flex-col mx-2 mt-2>
      <view flex-center justify="start">
        <text font-900 class="text-base">吴镇纪念馆</text>
        <span ml-3 bg="red-500" color="#fff" px-2 class="text-sm text-center">清廉教育线</span>
      </view>
      <view flex color="#666" font-normal my-2>
        <uni-icons type="location" size="18" color="#666"></uni-icons>
        嘉善县魏塘街道花园路178号 | 5公里
        <text bg="#2289FF" color="#fff" rounded-lg px-2 ml-4>导航</text>
      </view>
      <view flex color="#666" font-normal mb-2>
        <uni-icons type="phone" size="18" color="#666"></uni-icons>
        0573-12928272
        <text bg="#2289FF" color="#fff" rounded-lg px-2 ml-4>拨打</text>
      </view>
    </view>
    <hr color="#f0f0f0" />
    <wt-section title="介绍" type="line"></wt-section>
    <text>
      吴镇纪念馆于2000年8月建成，地址位于嘉善县魏塘街道花园路178号，是为了纪念元代四大画家之一吴镇而建，为嘉兴市廉政文化教育基地。
      纪念馆以吴镇刚正不阿、清雅高洁的品质为主线，设立“廉廊”、“廉亭”、“廉墙”，同时借助开展青少年课外培训的优势，举办廉政签名、廉政书画展等活动，设计、生产具有鲜明特色的廉洁文化系列产品，着力打造融教育、文化、产业、经济为一体的廉政文化教育基地。
    </text>
  </view>
</template>

<script setup>
let info = $([
  {
    content: 'http://store.is.autonavi.com/showpic/c8b4fa5a88fd2761ccdb06aedcbf99ea',
  },
  {
    content: 'http://store.is.autonavi.com/showpic/4a22f3281f44f1faa7a90330f659b433',
  },
  {
    content: 'http://store.is.autonavi.com/showpic/3defcfc7589e8520ac522134999e8a2a',
  },
])
let current = ref(0)
let mode = $('dot')
function change(e) {
  current.value = e.detail.current
}
</script>

<style lang="scss"></style>

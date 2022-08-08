<template>
  <meta title="点位列表" />
  <div mt-2>
    <MapTopSelect name="index" icon="map" />
  </div>
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
        <view flex flex-col mx-2 mt-2>
          <view flex-center justify="start">
            <text font-900 class="text-base">吴镇纪念馆</text>
            <span ml-3 bg="red-500" color="#fff" px-2 class="text-sm text-center">清廉教育线</span>
          </view>
          <view flex color="#666" font-normal>
            <uni-icons type="location" size="18" color="#666"></uni-icons>
            嘉善县魏塘街道花园路178号 | 5公里
          </view>
        </view>
      </view>
    </template>
    <view class="text-cut-2" @click="handleGo()">
      吴镇纪念馆于2000年8地址位于嘉善县魏塘街道花园路178号地址位于嘉善县魏塘街道花园路178号地址位于嘉善县魏塘街道花园路178号地址位于嘉善县魏塘街道花园路178号地址位于嘉善县魏塘街道花园路178号月建成，地址位于嘉善县魏塘街道花园路178号，是为了纪念元代四大画家之
    </view>
    <view flex color="#3089FF" mt-2>
      <view flex-center @click="PhoneCall(185438715282)">
        <uni-icons type="phone-filled" size="18" color="#3089FF"></uni-icons>
        <text mx-2>拨打</text>
      </view>
      <view flex-center mx-6 @click="actionsClick('点赞')">
        <uni-icons type="navigate-filled" size="18" color="#3089FF"></uni-icons>
        <text mx-2>导航</text>
      </view>
      <view flex-center @click="handleGo()">
        <uni-icons type="bars" size="18" color="#3089FF"></uni-icons>
        <text mx-2>查看详情</text>
      </view>
    </view>
  </uni-card>
</template>

<script setup>
import MapTopSelect from '@/components/MapTopSelect'
function handleGo() {
  app.to('mapDetail', { deatilId: 1 })
}
function PhoneCall(num) {
  uni.makePhoneCall({
    phoneNumber: num, //仅为示例
  })
}
</script>

<style lang="scss"></style>

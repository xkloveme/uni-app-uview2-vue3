<template>
  <meta title="点位详情" navigationStyle="custom" />
  <div>
    <uni-swiper-dot :info="info" field="content" mode="dot">
      <swiper class="swiper-box" h-40>
        <swiper-item v-for="(img, index) in info" :key="index">
          <view class="swiper-item">
            <img :src="img.url" w-full h-full />
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </div>

  <view rounded-lg px-2 pt-2 class="-mt-1 bg-light-50" bg="light-50" h-full>
    <view flex flex-col mx-2 mt-2>
      <view flex-center justify="start">
        <text font-900 class="text-base">{{ item.name }}</text>
        <uni-tag :text="item.line" type="error" size="small" ml-1 min-w-18></uni-tag>
      </view>
      <view flex-center justify="start" color="#666" font-normal my-2 @click="openPopup(item)">
        <uni-icons type="location" size="18" color="#666"></uni-icons>
        {{ item.address }} | {{ data.distance || '-' }}公里
        <button class="mini-btn ml-1" type="primary" size="mini" w-25>导航</button>
      </view>
      <view
        v-if="item.phone"
        flex-center
        justify="start"
        color="#666"
        font-normal
        mb-2
        @click="PhoneCall(item.phone)"
      >
        <uni-icons type="phone" size="18" color="#666"></uni-icons>
        {{ item.phone }}
        <button class="mini-btn ml-1" type="primary" size="mini" w-25>拨打</button>
      </view>
    </view>
    <hr color="#f0f0f0" />
    <wt-section title="介绍" type="line"></wt-section>
    <div>
      {{ item.intro }}
      <div w-full h-50></div>
    </div>
  </view>
  <SelectMap ref="selectMapPopup" :lnglat="lnglat" :addr="addr" />
</template>

<script setup>
import $api from '@/api'
import { useQuery } from '@/hooks'
import SelectMap from '@/components/SelectMap'
const { data } = $(useQuery())
let info = ref([
  {
    url: '//store.is.autonavi.com/showpic/cf623a546cdbcf6c8cfc35c392106283',
  },
])
function PhoneCall(num) {
  if (!num) {
    return uni.showToast({
      icon: 'none',
      title: '暂未提供电话',
    })
  }
  ZWJSBridge.onReady(() => {
    console.log('初始化完成后，执行bridge方法')
    ZWJSBridge.phoneCall({
      corpId: num,
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  })
  // uni.makePhoneCall({
  //   phoneNumber: num,
  // })
}
let selectMapPopup = ref(null)
let lnglat = ref([])
let addr = ref('')
function openPopup(point) {
  lnglat.value = [point.longitude, point.latitude]
  addr.value = point.address
  selectMapPopup.value.toggle()
}
let item = ref({})
$api.getPointsDetail(data.detailId).then(res => {
  item.value = res.data
  if (res.data?.imageList?.length) {
    info.value = res.data.imageList
  }
})
</script>

<style lang="scss"></style>

<template>
  <meta title="点位详情" navigationStyle="custom" />
  <uni-swiper-dot :info="info" field="content" mode="dot">
    <swiper class="swiper-box" h-50>
      <swiper-item v-for="(img, index) in info" :key="index">
        <view class="swiper-item">
          <img :src="img.url" w-full h-full />
        </view>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
  <view bg="light-50" rounded-lg px-2 pt-2 fixed top-40 left-0 right-0 h-full>
    <view flex flex-col mx-2 mt-2>
      <view flex-center justify="start">
        <text font-900 class="text-base">{{ item.name }}</text>
        <span ml-3 bg="red-500" color="#fff" px-2 class="text-sm text-center">{{ item.line }}</span>
      </view>
      <view flex color="#666" font-normal my-2 @click="openPopup(item)">
        <uni-icons type="location" size="18" color="#666"></uni-icons>
        {{ item.address }} | {{ data.distance || '-' }}公里
        <text bg="#2289FF" color="#fff" rounded-lg px-2 ml-4>导航</text>
      </view>
      <view flex color="#666" font-normal mb-2 @click="PhoneCall(item.phone)">
        <uni-icons type="phone" size="18" color="#666"></uni-icons>
        {{ item.phone }}
        <text bg="#2289FF" color="#fff" rounded-lg px-2 ml-4>拨打</text>
      </view>
    </view>
    <hr color="#f0f0f0" />
    <wt-section title="介绍" type="line"></wt-section>
    <text>
      {{ item.intro }}
    </text>
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
    url: 'http://store.is.autonavi.com/showpic/cf623a546cdbcf6c8cfc35c392106283',
  },
])
function PhoneCall(num) {
  dd.ready(
    {
      developer: 'xkloveme@qq.com',
      usage: ['dd.biz.telephone'],
      remark: '打电话',
    },
    /* eslint handle-callback-err: "warn" */
    () => {
      /* 可以放心调用JSBridge方法 */
      dd.biz.telephone.call({
        corpId: num,
        onSuccess: function (data) {},
        onFail: function (error) {},
      })
    },
  )
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

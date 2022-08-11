<template>
  <meta title="点位列表" navigationStyle="custom" />
  <div>
    <MapTopSelect name="index" icon="map" @change-select="init" />
  </div>
  <uni-card v-for="item in list" :key="item.id" :is-shadow="true">
    <template #title>
      <view flex>
        <img
          :src="
            item.fileUrl || 'http://store.is.autonavi.com/showpic/cf623a546cdbcf6c8cfc35c392106283'
          "
          w-10
          h-10
          m-2
          mb-1
        />
        <view flex flex-col mx-2 mt-2>
          <view flex-center justify="start">
            <text font-900 class="text-base">{{ item.name }}</text>
            <span ml-3 bg="red-500" color="#fff" px-2 class="text-sm text-center">
              {{ item.line }}
            </span>
          </view>
          <view flex color="#666" font-200>
            <uni-icons type="location" size="18" color="#666"></uni-icons>
            {{ item.address }} | {{ item.distance || '-' }}公里
          </view>
        </view>
      </view>
    </template>
    <view class="text-cut-2" @click="handleGo(item)">
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
  <SelectMap ref="selectMapPopup" :lnglat="lnglat" :addr="addr" />
</template>

<script setup>
import $api from '@/api'
import { useScroll } from '@/hooks'
import MapTopSelect from '@/components/MapTopSelect'
import SelectMap from '@/components/SelectMap'
function PhoneCall(num) {
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
        console.log(error)
      })
  })
  // uni.makePhoneCall({
  //   phoneNumber: num,
  // })
}
function handleGo(item) {
  app.to('mapDetail', { detailId: item.id, distance: item.distance })
}
let selectMapPopup = ref(null)
let lnglat = ref([])
let addr = ref('')
function openPopup(item) {
  lnglat.value = [item.longitude, item.latitude]
  addr.value = item.address
  selectMapPopup.value.toggle()
}
let list = ref([])
useScroll(onPageScroll).onLoad(page => {
  let pageNum = page.num // 页码, 默认从1开始
  let pageSize = page.size // 页长, 默认每页10条
  app.info('页面加载', `第${page.num}页`)
  $api
    .getMapPoints({
      page: page.num,
      size: page.size,
      longitude: app.User.locationArr[0],
      latitude: app.User.locationArr[1],
      name: app.User.name,
      area: app.User.area,
      line: app.User.line,
    })
    .then(res => {
      if (page.num == 1) list.value = [] //如果是第一页需手动置空列表
      list.value = list.value.concat(res.rows) //追加新数据
      page.endByPage(10, res.total)
      if (list.value.length >= res.total) {
        page.endSuccess(res.total, false)
      }
    })
})
function init(e) {
  if (e) {
    $api
      .getMapPoints({
        page: 1,
        size: 10,
        longitude: app.User.locationArr[0],
        latitude: app.User.locationArr[1],
        name: app.User.name,
        area: app.User.area,
        line: app.User.line,
      })
      .then(res => {
        list.value = [] //如果是第一页需手动置空列表
        list.value = list.value.concat(res.rows) //追加新数据
      })
  }
}
</script>

<style lang="scss"></style>

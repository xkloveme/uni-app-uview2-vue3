<template>
  <meta title="点位列表" navigationStyle="custom" />
  <div>
    <MapTopSelect name="index" icon="map" @change-select="init" />
  </div>
  <uni-card v-for="item in list" :key="item.id" :is-shadow="true">
    <template #title>
      <view flex flex-col>
        <view flex>
          <img
            :src="
              item.fileUrl || '//store.is.autonavi.com/showpic/cf623a546cdbcf6c8cfc35c392106283'
            "
            w-10
            h-10
            m-2
            mb-1
          />
          <view flex flex-col mx-2 mt-2>
            <view font-900 class="text-base">{{ item.name }}</view>
            <view><uni-tag :text="item.line" type="error" size="small"></uni-tag></view>
          </view>
        </view>
        <view flex color="#666" font-200>
          <uni-icons type="location" size="18" color="#666"></uni-icons>
          {{ item.address }} | {{ item.distance || '-' }}公里
        </view>
      </view>
    </template>
    <view class="text-cut-2 text-sm" @click="handleGo(item)">
      {{ item.intro }}
    </view>
    <view flex color="#3089FF" mt-2>
      <view v-if="item.phone" flex-center @click="PhoneCall(item.phone)">
        <uni-icons
          type="phone-filled"
          :size="app.Global.FontSizeNum == 16 ? 18 : 22"
          color="#3089FF"
        ></uni-icons>
        <text class="text-base mx-0.5">拨打</text>
      </view>
      <view v-if="app.Global.GetTicketId == ''" flex-center mx-6 @click="openPopup(item)">
        <uni-icons
          type="navigate-filled"
          :size="app.Global.FontSizeNum == 16 ? 18 : 22"
          color="#3089FF"
        ></uni-icons>
        <text class="text-base mx-0.5">导航</text>
      </view>
      <view flex-center @click="handleGo(item)">
        <uni-icons
          type="bars"
          :size="app.Global.FontSizeNum == 16 ? 18 : 22"
          color="#3089FF"
        ></uni-icons>
        <text class="text-base mx-0.5">查看详情</text>
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
  if (!num) {
    return uni.showToast({
      icon: 'none',
      title: '暂未提供电话',
    })
  }
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
        uni.makePhoneCall({
          phoneNumber: num,
        })
        console.log(error)
      })
  })
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
      pageNum: page.num,
      pageSize: page.size,
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
  app.User.addresetUpScroll()
}
</script>

<style lang="scss"></style>

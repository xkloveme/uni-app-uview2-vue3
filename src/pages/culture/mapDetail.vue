<template>
  <meta title="点位详情" navigationStyle="custom" />
  <sys>
    <template #fixed>
      <div
        style="width: 100vw; height: 100vh; pointer-events: auto"
        class="bg-light-50 absolute top-0 left-0 right-0 overflow-auto"
      >
        <div @click="previewImage(info)">
          <uni-swiper-dot :info="info" :current="current" field="content" mode="dot">
            <swiper class="swiper-box" h-40 @change="change">
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
            <view
              flex-center
              justify="start"
              color="#666"
              font-normal
              my-2
              @click="openPopup(item)"
            >
              <uni-icons
                type="location"
                :size="app.Global.FontSizeNum == 16 ? 18 : 22"
                color="#666"
              ></uni-icons>
              {{ item.address }} | {{ data.distance || '-' }}公里
              <button
                v-if="app.Global.GetTicketId == ''"
                class="mini-btn ml-1 text-sm"
                type="primary"
                size="mini"
                w-25
              >
                导航
              </button>
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
              {{ desensitization(item.phone) }}
              <button class="mini-btn ml-1 text-sm" type="primary" size="mini" w-25>拨打</button>
            </view>
          </view>
          <hr color="#f0f0f0" />
          <wt-section title="介绍" type="line">
            <div v-if="item.audioLink" w-6 h-6 @click="playAudio(item.audioLink)">
              <img v-if="isPlay" src="@/static/img/banimg.gif" w-6 h-6 />
              <img v-else src="@/static/img/voice.png" w-6 h-6 />
            </div>
          </wt-section>
          <div>
            {{ item.intro }}
          </div>
          <wt-section v-if="item.vrLink" title="VR全景" type="line"></wt-section>
          <div v-if="item.vrLink" flex-center mt-5 flex-col @click="gotopage(item.vrLink)">
            <qrcode-vue :value="qrUrl" :size="200" level="H" />
            <text mt-4>扫描/点击二维码查看VR全景图</text>
          </div>
          <!-- <div v-if="item.audioLink" fixed bottom-16 right-5 flex flex-col @click="playAudio(item.audioLink)">
            <uni-icons type="headphones" size="50"></uni-icons>
          </div> -->
          <div w-full h-50></div>
        </view>
      </div>
      <SelectMap ref="selectMapPopup" :lnglat="lnglat" :addr="addr" />
    </template>
  </sys>
</template>

<script setup>
import QrcodeVue from 'qrcode.vue'
import $api from '@/api'
import { useQuery } from '@/hooks'
import SelectMap from '@/components/SelectMap'
const { data } = $(useQuery())
let current = ref(0)
let info = ref([
  {
    url: '//store.is.autonavi.com/showpic/cf623a546cdbcf6c8cfc35c392106283',
  },
])
function change(e) {
  current.value = e.detail.current
}
let isPlay = ref(false)
const innerAudioContext = uni.createInnerAudioContext()
innerAudioContext.onPlay(() => {
  console.log('开始播放')
  isPlay.value = true
})
innerAudioContext.onEnded(() => {
  console.log('播放完毕')
  isPlay.value = false
})
// 播放音频
function playAudio(audioLink) {
  innerAudioContext.src = audioLink
  innerAudioContext.loop = true
  if (isPlay.value) {
    innerAudioContext.pause()
    isPlay.value = false
  } else {
    innerAudioContext.play()
  }
}
// 跳转3D预览
function gotopage(href) {
  window.location.href = href
}
// 预览图片
function previewImage(info) {
  let urls = []
  info.map(item => {
    urls.push(item.url)
  })
  uni.previewImage({
    urls: urls,
  })
}

// 手机号脱敏
function desensitization(str, beginLen = 3, endLen = -4) {
  if (str.startsWith('1')) {
    beginLen = 3
  } else {
    beginLen = 4
  }
  let len = String(str).length
  let firstStr = str.substr(0, beginLen)
  let lastStr = str.substr(endLen)
  let middleStr = str.substring(beginLen, len - Math.abs(endLen)).replace(/[\s\S]/gi, '*')
  let tempStr = firstStr + middleStr + lastStr
  return tempStr
}
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

onUnload(() => {
  innerAudioContext.stop()
  uni.closePreviewImage()
})
</script>

<style lang="scss"></style>

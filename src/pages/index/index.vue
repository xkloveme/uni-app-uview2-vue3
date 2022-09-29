<template>
  <meta title="一网监督" title:微信="一网监督" navigationStyle="custom" />
  <div>
    <uni-swiper-dot :info="info" :current="current" field="content" mode="round">
      <swiper class="swiper-box" h-40 :autoplay="true" :circular="true" @change="change">
        <swiper-item v-for="(img, index) in info" :key="index">
          <view class="swiper-item">
            <img :src="img.url" w-full h-full />
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <div class="-mt-4 py-2 z-9999 absolute w-full">
      <div class="bg-light-50 rounded-lg flex-center mx-3">
        <div class="text-dark-900 font-bold p-1 px-4">
          <span color="#FF3535">清廉</span>
          <br />
          动态
        </div>
        |
        <div color="#333" class="flex-1 w-60 pl-4 text-cut">{{ notice[noticeIndex] }}</div>
        <div color="#999999" class="px-2">
          全部
          <uni-icons type="forward" color="#999" size="16"></uni-icons>
        </div>
      </div>
      <!-- <uni-notice-bar @getmore="goPage('lzdt')" background-color="#fffeff" color="#4c4a4d" scrollable class="w-full"
        :showGetMore="true" moreText="全部 >" single="true" moreColor="#999"
        text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏"></uni-notice-bar> -->
    </div>
  </div>
  <uni-row class="flex-center mt-15 w-full gap-2 px-2">
    <uni-col :span="12">
      <img src="@/static/assets/举报.png" w-full h-20 @click="goPage('report')" />
    </uni-col>
    <uni-col :span="12">
      <img src="@/static/assets/案例.png" w-full h-20 @click="goPage('case')" />
    </uni-col>
  </uni-row>
  <div px-1 mt-3 @click="goPage('culture')">
    <img src="@/static/assets/map.png" w-full h-full />
  </div>
  <!-- <div fixed bottom-40 right-2 p-1 py-2 flex-center flex-col bg-white rounded>
    <div v-if="app.Global.FontSizeNum == '16'" flex-center @click="SetFontSize(20)">
      <img
        style="width: 20px; margin-right: 5px"
        src="https://hltm.jw.linan.gov.cn/linanjiwei/liananjiwei/miniproject/老年.png"
      />
      长辈版
    </div>
    <div v-else flex-center @click="SetFontSize(16)">
      <img
        style="width: 20px; margin-right: 5px"
        src="https://hltm.jw.linan.gov.cn/linanjiwei/liananjiwei/miniproject/常规.png"
      />
      常规版
    </div>
  </div> -->
  <div fixed bottom-10 right-2 left-2 text-center flex-center flex-col text-gray-500>
    <div>本服务由浙江政务服务网、嘉善县西塘镇人民政府提供，</div>
    <div>
      咨询服务热线：
      <span class="text-blue-500" @click="PhoneCall('057384228969')">0573-84228969</span>
    </div>
  </div>
</template>

<script setup>
function goPage(url) {
  app.to(`/pages/${url}/index`)
}
function SetFontSize(fontSize) {
  app.Global.SetFontSize(fontSize)
  window.document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px'
}
let noticeIndex = ref(0)
let notice = [
  '清风廉旅|了凡故里沐清风',
  '清风之旅 | 先贤之廉韵 悠悠润蓉溪',
  '镜头 | 第三届“清廉在身边”摄影作品线上展（一）',
  '清风之旅丨莲廊雅集话清风',
  '吴江嘉善两地纪检监察机关开展协同监督',
  '吴江嘉善两地纪检监察机关开展协同监督',
]
let timer = null
let current = ref(0)
function changeNotice() {
  timer = setTimeout(() => {
    noticeIndex.value++
    if (noticeIndex.value == 6) {
      noticeIndex.value = 0
    }
  }, 5000)
}
changeNotice()

let info = ref([
  {
    url: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/assets/banner2.png',
  },
  {
    url: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/assets/banner.png',
  },
  {
    url: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/assets/banner1.png',
  },
])
function change(e) {
  current.value = e.detail.current
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
onUnload(() => {
  clearTimeout(timer) //关闭timer定时器
  timer = null
})
</script>

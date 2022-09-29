<template>
  <meta title="我要举报" title:微信="我要举报" navigationStyle="custom" />
  <div class="report">
    <div class="bg-light-50 rounded-lg mx-5 py-5 relative text-blue-400">
      <h3 absolute ml-4>举报电话</h3>
      <div
        class="flex-center justify-between rounded-lg mx-4 p-5 mt-10 click-btn"
        @click="PhoneCall('12388')"
      >
        <div>全国纪检监察举报电话</div>
        <div color="#537fa2">12388</div>
      </div>
      <div
        class="flex-center justify-between rounded-lg mx-4 p-5 mt-5 click-btn1"
        @click="PhoneCall('021-12388')"
      >
        <div>青浦区举报电话</div>
        <div color="#5483c2">021-12388</div>
      </div>
      <div
        class="flex-center justify-between rounded-lg mx-4 p-5 mt-5 click-btn1"
        @click="PhoneCall('0512-12388')"
      >
        <div>吴江区举报电话</div>
        <div color="#5483c2">0512-12388</div>
      </div>
      <div
        class="flex-center justify-between rounded-lg mx-4 p-5 mt-5 click-btn1"
        @click="PhoneCall('0573-84228107')"
      >
        <div>嘉善县举报电话</div>
        <div color="#5483c2">0573-84228107</div>
      </div>
      <!-- <h3 absolute ml-4 mt-5 v-if="app.Global.GetTicketId == ''">举报网站</h3>
      <div v-if="app.Global.GetTicketId == ''">
        <div
          class="flex-center justify-between rounded-lg mx-4 p-5 mt-15 click-btn1"
          @click="gotopage('嘉善', 'http://zhejiang.12388.gov.cn/jiaxing/jiashan/')"
        >
          <div>嘉善</div>
          <div color="#5483c2">我要举报</div>
        </div>
        <div
          class="flex-center justify-between rounded-lg mx-4 p-5 mt-5 click-btn1"
          @click="gotopage('青浦', 'http://shanghai.12388.gov.cn/qingpu/')"
        >
          <div>青浦</div>
          <div color="#5483c2">我要举报</div>
        </div>
        <div
          class="flex-center justify-between rounded-lg mx-4 p-5 mt-5 click-btn1"
          @click="gotopage('吴江', 'http://jiangsu.12388.gov.cn/suzhoushi/wujiangqu/')"
        >
          <div>吴江</div>
          <div color="#5483c2">我要举报</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
function gotopage(name, href) {
  // app.to(`/pages/iframe/index`, { href: href, name: name })
  window.location.href = href
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
</script>

<style lang="scss">
.report {
  height: 30vh;
  width: 100%;
  padding-top: 10vh;
  color: #fff;
  background: url(@/static/img/bg.png) center/100% 100% no-repeat;

  .click-btn {
    color: #2f3435;
    font-weight: 600;
    background-color: #e2f0fe;
  }
  .click-btn1 {
    color: #2f3435;
    font-weight: 600;
    background-color: #e6f5f0;
  }
}
</style>

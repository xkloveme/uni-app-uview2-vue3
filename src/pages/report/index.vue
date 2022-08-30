<template>
  <meta title="我要举报" title:微信="我要举报" navigationStyle="custom" />
  <div class="report">
    <div flex-center mx-20 py-15 pb-5 relative>
      <img src="@/static/img/line-title.png" w-full h-10 />
      <h3 absolute>举报电话</h3>
    </div>
    <div class="flex-center justify-between mx-10 p-5 click-btn" @click="PhoneCall('12388')">
      <div>举报电话</div>
      <div color="red">12388</div>
    </div>
    <div flex-center mx-20 py-5 relative>
      <img src="@/static/img/line-title.png" w-full h-10 />
      <h3 absolute>举报网站</h3>
    </div>
    <div
      class="flex-center justify-between mx-10 p-5 click-btn"
      @click="gotopage('嘉善', 'http://zhejiang.12388.gov.cn/jiaxing/jiashan/')"
    >
      <div>嘉善</div>
      <div color="red">我要举报</div>
    </div>
    <div
      class="flex-center justify-between mx-10 p-5 click-btn"
      @click="gotopage('青浦', 'http://shanghai.12388.gov.cn/qingpu/')"
    >
      <div>青浦</div>
      <div color="red">我要举报</div>
    </div>
    <div
      class="flex-center justify-between mx-10 p-5 click-btn"
      @click="gotopage('吴江', 'http://jiangsu.12388.gov.cn/suzhoushi/wujiangqu/')"
    >
      <div>吴江</div>
      <div color="red">我要举报</div>
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
        console.log(error)
      })
  })
  // uni.makePhoneCall({
  //   phoneNumber: num,
  // })
}
</script>

<style lang="scss">
.report {
  height: 100vh;
  width: 100%;
  color: #fff;
  background: url(@/static/img/bg.png) center/100% 100% no-repeat;
  .click-btn {
    color: #2f3435;
    font-weight: 900;
    background: url(@/static/img/line.png) center/100% 100% no-repeat;
  }
}
</style>

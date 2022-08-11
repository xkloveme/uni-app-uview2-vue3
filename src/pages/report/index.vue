<template>
  <meta title="我要举报" title:微信="我要举报" navigationStyle="custom" />
  <img src="@/static/img/banner.png" w-full h-40 @click="PhoneCall(12388)" />
  <div>
    <h3 p-5 font="normal">举报网站</h3>
    <div
      mx-5
      p-5
      bg="light-100"
      shadow-xl
      rounded
      flex
      justify="between"
      align="items-center"
      mt-4
      @click="gotopage('嘉善', 'http://zhejiang.12388.gov.cn/jiaxing/jiashan/')"
    >
      <h4>嘉善</h4>
      <a color="blue">我要举报</a>
    </div>
    <div
      mx-5
      p-5
      bg="light-100"
      shadow-xl
      rounded
      flex
      justify="between"
      align="items-center"
      mt-4
      @click="gotopage('青浦', 'http://shanghai.12388.gov.cn/qingpu/')"
    >
      <h4>青浦</h4>
      <a color="blue">我要举报</a>
    </div>
    <div
      mx-5
      p-5
      bg="light-100"
      shadow-xl
      rounded
      flex
      justify="between"
      align="items-center"
      mt-4
      @click="gotopage('吴江', 'http://jiangsu.12388.gov.cn/suzhoushi/wujiangqu/')"
    >
      <h4>吴江</h4>
      <a color="blue">我要举报</a>
    </div>
  </div>
</template>

<script setup>
function gotopage(name, href) {
  // app.to(`/pages/iframe/index`, { href: href, name: name })
  window.location.href = href
}
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
</script>

<style lang="scss"></style>

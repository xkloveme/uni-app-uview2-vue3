<template>
  <meta title="我要举报" title:微信="我要举报" navigationStyle="custom" />
  <img src="@/static/img/banner.png" w-full h-40 />
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
      @click="gotopage('青浦', 'http://jiangsu.12388.gov.cn/suzhoushi/wujiangqu/')"
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
      @click="gotopage('吴江', 'http://shanghai.12388.gov.cn/qingpu/')"
    >
      <h4>吴江</h4>
      <a color="blue">我要举报</a>
    </div>
  </div>
</template>

<script setup lang="ts">
function gotopage(name, href) {
  // app.to(`/pages/iframe/index`, { href: href, name: name })
  window.location.href = href
}
</script>

<style lang="scss"></style>

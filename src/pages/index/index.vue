<template>
  <meta title="一网监督" title:微信="一网监督" />
  <div>
    <h3 p-5>群众监督</h3>
    <div mx-5 bg="light-100" rounded flex-center justify="start" @click="goPage('report')">
      <img src="@/static/img/1.png" w-10 h-10 m-5 />
      <span>我要举报</span>
    </div>
  </div>
  <div>
    <h3 p-5>清廉共享</h3>
    <div mx-5 bg="light-100" rounded flex-center justify="between">
      <div flex-center @click="goPage('culture')">
        <img src="@/static/img/2.png" w-10 h-10 m-5 />
        <span>清廉文化</span>
      </div>
      <div flex-center mx-5 @click="goPage('case')">
        <img src="@/static/img/3.png" w-10 h-10 m-5 />
        <span>典型案例</span>
      </div>
    </div>
  </div>
</template>

<script setup>
function goPage(url) {
  app.to(`/pages/${url}/index`)
}
</script>

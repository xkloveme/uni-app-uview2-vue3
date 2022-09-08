<template>
  <meta title="一网监督" title:微信="一网监督" navigationStyle="custom" />
  <div>
    <h3 p-5>群众监督</h3>
    <div mx-5 bg="light-100" rounded flex-center justify="between">
      <div flex-center px-3 py-5 @click="goPage('report')">
        <img src="@/static/img/1.png" w-10 h-10 mr-1 />
        <span>我要举报</span>
      </div>
      <div flex-center mr-2 px-3 py-5 @click="goPage('lzdt')">
        <img src="@/static/img/qldt.png" w-10 h-10 mr-1 />
        <span>清廉动态</span>
      </div>
    </div>
  </div>
  <div>
    <h3 p-5>清廉共享</h3>
    <div mx-5 bg="light-100" rounded flex-center justify="between">
      <div flex-center px-3 py-5 @click="goPage('culture')">
        <img src="@/static/img/2.png" w-10 h-10 mr-1 />
        <span>清廉文化</span>
      </div>
      <div flex-center mr-2 px-3 py-5 @click="goPage('case')">
        <img src="@/static/img/3.png" w-10 h-10 mr-1 />
        <span>典型案例</span>
      </div>
    </div>
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

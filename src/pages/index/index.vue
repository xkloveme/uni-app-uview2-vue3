<template>
  <meta title="主页" title:微信="微信端主页" />
  <div flex-center-col pt10>
    <div text-4xl py-15>
      <div class="icon" i-ri-leaf-fill inline-block></div>
    </div>
    <p>
      <em text-sm opacity-75>快速，优雅的全栈预设模板</em>
    </p>
    <uni-rate :max="10" :value="5" />
    <div py-15>
      <!-- <input v-model="name" placeholder="你的名字?" inputAlign="center" /> -->
      <uni-easyinput v-model="name" errorMessage focus placeholder="你的名字?"></uni-easyinput>
    </div>
    <!-- ↓这里可以直接使用app -->
    <div @click="app.User.handleClick">reverse: {{ app.User.reverseName }}</div>
    <div py-25>
      <uni-button type="primary" color="linear-gradient(120deg, #f093fb 0%, #f5576c 100%)">
        开冲
      </uni-button>
      <button color="linear-gradient(120deg, #f093fb 0%, #f5576c 100%)" m="10" @click="sayTest()">
        测试页
      </button>
      <button color="linear-gradient(120deg, #f093fb 0%, #f5576c 100%)" m="10" @click="sayApi()">
        api页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 可以用ref语法糖解构store
const { name } = $(app.User)

function sayHi() {
  app
    .to('hi', { name })
    .then(({ text }) =>
      text
        ? uni.showToast({ title: '收到返回值: ' + text })
        : uni.showToast({ title: '未收到返回值', icon: 'none' }),
    )
    .catch(({ text }) => {
      uni.showToast({ title: '子页面抛出异常' + text, icon: 'none' })
    })
}

function sayTest() {
  app.to('/pages/test/index')
}
function sayApi() {
  app.to('/pages/api/index')
}

// useScroll(onPageScroll).onLoad(page => {
//   app.info('页面加载', `第${page.num}页`)
//   setTimeout(() => page.endSuccess(1, false), 1000)
// })
</script>

<style lang="scss">
.icon {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}
</style>

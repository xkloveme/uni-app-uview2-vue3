<template>
  <meta title="测试页面" />
  <uni-badge text="1"></uni-badge>
  <uni-card title="基础卡片" extra="额外信息">
    <text>这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text>
  </uni-card>
  <uni-collapse>
    <uni-collapse-item title="默认开启" :open="true">
      <text>折叠内容</text>
    </uni-collapse-item>
    <uni-collapse-item title="折叠内容">
      <text>折叠内容</text>
    </uni-collapse-item>
    <uni-collapse-item title="禁用状态" disabled>
      <text>折叠内容</text>
    </uni-collapse-item>
  </uni-collapse>
  <view class="container">
    <uni-card :is-shadow="false" is-full>
      <text class="uni-h6">组合框一般用于可以选择也可以输入的表单项。</text>
    </uni-card>
    <view class="example-body">
      <uni-combox :candidates="candidates" placeholder="请选择所在城市" v-model="city"></uni-combox>
      <view class="result-box">
        <text>所选城市为：{{ city }}</text>
      </view>
    </view>

    <view class="example-body">
      <uni-combox
        :border="false"
        :candidates="candidates"
        placeholder="请选择所在城市"
      ></uni-combox>
    </view>

    <view class="example-body">
      <uni-combox emptyTips="这里啥都没有" placeholder="请选择所在城市"></uni-combox>
    </view>
  </view>
  <uni-number-box :min="0" :max="9"></uni-number-box>
  <uni-calendar
    :insert="true"
    :lunar="true"
    :start-date="'2019-3-2'"
    :end-date="'2019-5-20'"
    @change="change"
  />
  <view class="example-body">
    <uni-title type="h1" title="h1 一级标题"></uni-title>
    <uni-title type="h2" title="h2 二级标题"></uni-title>
    <uni-title type="h3" title="h3 三级标题"></uni-title>
    <uni-title type="h4" title="h4 四级标题"></uni-title>
    <uni-title type="h5" title="h5 五级标题"></uni-title>
  </view>
  <view class="example-body">
    <uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
  </view>

  <button @click="showDrawer" type="primary">右侧弹出 显示Drawer</button>
  <uni-drawer ref="showRight" mode="right" :mask-click="false">
    <scroll-view style="height: 100%" scroll-y="true">
      <button @click="closeDrawer" type="primary">关闭Drawer</button>
      <view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view>
    </scroll-view>
  </uni-drawer>

  <wt-section title="自定义列数" type="line" padding>
    <uni-grid :column="4" :highlight="true" @change="change">
      <uni-grid-item v-for="(item, index) in 8" :index="index" :key="index">
        <view class="grid-item-box flex flex-direction flex-wrap" style="background-color: #fff">
          <uni-icons type="image" :size="30" color="#777" />
          <text class="text">文本信息</text>
        </view>
      </uni-grid-item>
    </uni-grid>
  </wt-section>
</template>

<script setup lang="ts">
let range = ref([])
let candidates = ref(['北京', '南京', '东京', '武汉', '天津', '上海', '海口'])
let city = ref('')

const showRight = ref()
function showDrawer() {
  // showRight.value=true;
  showRight.value.open()
}
function closeDrawer() {
  showRight.value.close()
}
function change(e) {
  console.log('🐛 ~ file: index.vue ~ line 15 ~ change ~ e', e)
}
function maskClick(e) {
  console.log('🐛 ~ file: index.vue ~ line 23 ~ maskClick ~ e', e)
}
</script>

<style lang="scss"></style>

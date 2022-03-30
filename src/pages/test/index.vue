<template>
  <meta title="测试页面" />
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
</template>

<script setup lang="ts">
let range = ref([])
function change(e) {
  console.log('🐛 ~ file: index.vue ~ line 15 ~ change ~ e', e)
}
function maskClick(e) {
  console.log('🐛 ~ file: index.vue ~ line 23 ~ maskClick ~ e', e)
}
</script>

<style lang="scss"></style>

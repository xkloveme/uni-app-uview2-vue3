<template>
  <!-- 本组件将由uni-provider插件自动混入到每一个页面中 -->
  <MescrollBody
    :up="{ use: enableUp, textNoMore: '没有更多了' }"
    :down="{ use: enableDown }"
    @init="mescroll = $event"
    @up="fetch"
    @down="enableUp ? $event.resetUpScroll() : fetch($event)"
  >
    <slot></slot>
  </MescrollBody>
  <slot name="fixed"></slot>
</template>

<script setup lang="ts">
import MescrollBody from 'mescroll-uni/mescroll-body.vue'
import { useQuery, ScrollSymbol, ScrollOptions } from '@/hooks'
const { uuid } = $(useQuery())

// 页面卸载,解绑回调事件
onUnload(() => uni.$off(uuid + '_resolve'))
onUnload(() => uni.$off(uuid + '_reject'))
onUnload(() => uni.$off(uuid + '_query'))

// mescroll 提供上拉加载下拉刷新能力
// 文档: https://www.mescroll.com/uni.html
const { mescroll, fetch, enable } = $(inject<Partial<ScrollOptions>>(ScrollSymbol, {}))
let enableUp = $computed(() => ['all', 'up'].some(e => e == enable))
let enableDown = $computed(() => ['all', 'down'].some(e => e == enable))
// 监听页面是否需要刷新
const getShowTask = computed(() => {
  return app.User.resetUpScroll
})

watch(
  getShowTask,
  (newVal, oldVal) => {
    mescroll.resetUpScroll()
  },
  { deep: true },
)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style></style>

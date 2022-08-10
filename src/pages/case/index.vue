<template>
  <meta title="典型案例" title:微信="典型案例" navigationStyle="custom" />
  <div @up="fetch">
    <uni-card
      v-for="item in list"
      :key="item"
      mode="style"
      mx-5
      note="Tips"
      :is-shadow="true"
      @click="gotoPage(item.id)"
    >
      <img src="@/static/img/banner.png" w-full h-40 />
      <view flex-center justify="between">
        <view>{{ item.name }}</view>
        <view>
          <uni-icons type="map-pin-ellipse" size="16"></uni-icons>
          {{ item.xm }}
        </view>
      </view>
    </uni-card>
  </div>
</template>

<script setup>
import $api from '@/api'
import { useScroll } from '@/hooks'
function gotoPage(id) {
  app.to(`detail`, { deatilId: id })
}
let list = ref([])
useScroll(onPageScroll).onLoad(page => {
  let pageNum = page.num // 页码, 默认从1开始
  let pageSize = page.size // 页长, 默认每页10条
  console.log(app, 11)
  app.info('页面加载', `第${page.num}页`)
  $api
    .getMapPoints({ page: page.num, size: page.size, longitude: '', latitude: '', name: '' })
    .then(res => {
      if (page.num == 1) list.value = [] //如果是第一页需手动置空列表
      list.value = list.value.concat(res.rows) //追加新数据
      page.endByPage(10, res.total)
      if (list.value.length >= res.total) {
        page.endSuccess(2, false)
      }
    })
})
</script>

<style lang="scss"></style>

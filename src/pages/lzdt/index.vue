<template>
  <meta title="清廉动态" title:微信="清廉动态" navigationStyle="custom" />
  <div @up="fetch">
    <uni-card
      v-for="(item, index) in list"
      :key="item"
      mode="style"
      mx-5
      note="Tips"
      :is-shadow="true"
      @click="gotoPage(`${item.imgUrl}/动态/${index + 1}.png`)"
    >
      <div flex-center justify="start" class="text-sm">
        <img :src="`${item.imgUrl}/缩略图/${index + 1}.png`" mode="scaleToFill" w-15 h-15 />
        <view ml-2 flex-1 flex-col>
          <view class="text-cut w-7/8">{{ item.name }}</view>
          <view class="text-gray-400 mt-3">
            <!-- <uni-icons type="map-pin-ellipse" size="16"></uni-icons> -->
            {{ item.addrs }}
          </view>
        </view>
      </div>
    </uni-card>
  </div>
</template>

<script setup>
import $api from '@/api'
import { useScroll } from '@/hooks'
function gotoPage(url) {
  app.to(`detail`, { url: url })
}
let list = ref([
  {
    name: '清风廉旅|了凡故里沐清风',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/lzdt/',
  },
  {
    name: '清风之旅 | 先贤之廉韵 悠悠润蓉溪',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/lzdt/',
  },
  {
    name: '镜头 | 第三届“清廉在身边”摄影作品线上展（一）',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/lzdt/',
  },
  {
    name: '清风之旅丨莲廊雅集话清风',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/lzdt/',
  },
  {
    name: '吴江嘉善两地纪检监察机关开展协同监督',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/lzdt/',
  },
  {
    name: '吴江嘉善两地纪检监察机关开展协同监督',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/lzdt/',
  },
])
// useScroll(onPageScroll).onLoad(page => {
//   let pageNum = page.num // 页码, 默认从1开始
//   let pageSize = page.size // 页长, 默认每页10条
//   console.log(app, 11)
//   app.info('页面加载', `第${page.num}页`)
//   $api
//     .getMapPoints({ page: page.num, size: page.size, longitude: '', latitude: '', name: '' })
//     .then(res => {
//       if (page.num == 1) list.value = [] //如果是第一页需手动置空列表
//       list.value = list.value.concat(res.rows) //追加新数据
//       page.endByPage(10, res.total)
//       if (list.value.length >= res.total) {
//         page.endSuccess(2, false)
//       }
//     })
// })
</script>

<style lang="scss"></style>

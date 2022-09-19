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
      @click="gotoPage(item)"
    >
      <image :src="item.imgUrl" mode="scaleToFill" w-full h-40 />
      <view flex-center justify="between" class="text-sm">
        <view>{{ item.name }}</view>
        <view class="w-15">
          <uni-icons type="map-pin-ellipse" size="16"></uni-icons>
          {{ item.addrs }}
        </view>
      </view>
    </uni-card>
  </div>
</template>

<script setup>
import $api from '@/api'
import { useScroll } from '@/hooks'
function gotoPage(item) {
  app.to(`detail`, {
    url: item.videoUrl || `//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/${item.name}.png`,
    type: item.videoUrl ? 'mp4' : 'mp3',
  })
}
let list = ref([
  {
    name: '红色家规',
    addrs: '吴江',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/video/吴江典型案例/红色家规.png',
    videoUrl: 'https://hltm.jw.linan.gov.cn/linanjiwei/jsjw/video/吴江典型案例/红色家规.mp4',
  },
  {
    name: '完美的真相',
    addrs: '吴江',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/video/吴江典型案例/完美的真相.png',
    videoUrl: 'https://hltm.jw.linan.gov.cn/linanjiwei/jsjw/video/吴江典型案例/完美的真相.mp4',
  },
  {
    name: '吴江家风',
    addrs: '吴江',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/video/吴江典型案例/吴江家风.png',
    videoUrl: 'https://hltm.jw.linan.gov.cn/linanjiwei/jsjw/video/吴江典型案例/吴江家风.mp4',
  },
  {
    name: '婚宴的启示',
    addrs: '青浦',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/video/青浦典型案例/婚宴的启示.png',
    videoUrl: 'https://hltm.jw.linan.gov.cn/linanjiwei/jsjw/video/青浦典型案例/婚宴的启示.mp4',
  },
  {
    name: '透亮的水',
    addrs: '青浦',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/video/青浦典型案例/透亮的水.png',
    videoUrl: 'https://hltm.jw.linan.gov.cn/linanjiwei/jsjw/video/青浦典型案例/透亮的水.mp4',
  },
  {
    name: '"一时任性"损人又害己',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/img/img1.png',
  },
  {
    name: '"跑偏"的公务考察 "走歪"的政商关系',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/img/img2.png',
  },
  {
    name: '与老板“亲”却丢了“清”',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/img/img3.png',
  },
  {
    name: '以贷谋私 "亲""清"不分',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/img/img4.png',
  },
  {
    name: '拿"面子"换利益 这名党员被处分',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/img/img5.png',
  },
  {
    name: '无视规定"打招呼" 插手工程栽跟头',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/img/img6.png',
  },
  {
    name: '礼品礼卡让运管所干部"翻了车"',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/img/img7.png',
  },
  {
    name: '管不住嘴的代价',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/img/img8.png',
  },
  {
    name: '被“小意思”攻陷的“明星”村支书',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/img/img9.png',
  },
  {
    name: '骗取种粮补贴，这个村班子集体吃了处分',
    addrs: '嘉善',
    imgUrl: '//hltm.jw.linan.gov.cn/linanjiwei/jsjw/al/img/img10.png',
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

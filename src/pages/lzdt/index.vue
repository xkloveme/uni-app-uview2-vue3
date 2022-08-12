<template>
  <meta title="廉政动态" title:微信="廉政动态" navigationStyle="custom" />
  <div @up="fetch">
    <uni-card
      v-for="(item, index) in list"
      :key="item"
      mode="style"
      mx-5
      note="Tips"
      :is-shadow="true"
      @click="gotoPage(`${item.imgUrl}/${item.name}.png`)"
    >
      <div flex-center justify="start">
        <image :src="`${item.imgUrl}/img/img${index + 1}.png`" mode="scaleToFill" w-10 h-10 />
        <view ml-2 flex-1>
          <view class="text-cut" w-60>{{ item.name }}</view>
          <view>
            <uni-icons type="map-pin-ellipse" size="16"></uni-icons>
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
    name: '"一时任性"损人又害一时任性"损人又害己一时任性"损人又害己一时任性"损人又害己己',
    addrs: '嘉善',
    imgUrl: 'http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/al',
  },
  {
    name: '"跑偏"的公务考察 "走歪"的政商关系',
    addrs: '嘉善',
    imgUrl: 'http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/al',
  },
  {
    name: '与老板“亲”却丢了“清”',
    addrs: '嘉善',
    imgUrl: 'http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/al',
  },
  {
    name: '以贷谋私 "亲""清"不分',
    addrs: '嘉善',
    imgUrl: 'http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/al',
  },
  {
    name: '拿"面子"换利益 这名党员被处分',
    addrs: '嘉善',
    imgUrl: 'http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/al',
  },
  {
    name: '无视规定"打招呼" 插手工程栽跟头',
    addrs: '嘉善',
    imgUrl: 'http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/al',
  },
  {
    name: '礼品礼卡让运管所干部"翻了车"',
    addrs: '嘉善',
    imgUrl: 'http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/al',
  },
  {
    name: '管不住嘴的代价',
    addrs: '嘉善',
    imgUrl: 'http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/al',
  },
  {
    name: '被“小意思”攻陷的“明星”村支书',
    addrs: '嘉善',
    imgUrl: 'http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/al',
  },
  {
    name: '骗取种粮补贴，这个村班子集体吃了处分',
    addrs: '嘉善',
    imgUrl: 'http://hltm.jw.linan.gov.cn/linanjiwei/jsjw/al',
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

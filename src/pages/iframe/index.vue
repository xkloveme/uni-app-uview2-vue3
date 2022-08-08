<template>
  <meta :title="'name'" />
  <div :style="'height:' + height">
    <iframe :src="url" frameborder="no" style="width: 100%; height: 100%" scrolling="auto" />
  </div>
</template>

<script setup>
import { useQuery } from '@/hooks'
function onLoad(option) {
  const item = JSON.parse(decodeURIComponent(option.item))
  console.log('🐛 ~ file: index.vue ~ line 11 ~ onLoad ~ option', option, item)
}
// ts-ignore
// let { href, name } = useQuery({
//   href: 'http://jiangsu.12388.gov.cn/suzhoushi/wujiangqu/',
//   name: '嘉善',
// })
// console.log('🐛 ~ file: index.vue ~ line 14 ~ src', href, name)

const height = ref(document.documentElement.clientHeight - 94.5 + 'px;')
const url = computed(() => 'http://jiangsu.12388.gov.cn/suzhoushi/wujiangqu/')

onMounted(() => {
  window.onresize = function temp() {
    height.value = document.documentElement.clientHeight - 94.5 + 'px;'
  }
})
</script>

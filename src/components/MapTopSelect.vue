<template>
  <div w-full flex-center px-2>
    <uni-data-select
      v-model="value"
      w-2
      shadow-xl
      rounded
      bg="light-50"
      placeholder="全部区域"
      :localdata="range"
      @change="change"
    ></uni-data-select>
    <uni-data-select
      v-model="value"
      mx-2
      shadow-xl
      rounded
      bg="light-50"
      placeholder="全部路线"
      :localdata="range"
      @change="change"
    ></uni-data-select>
    <div p-2 flex-center shadow-xl mx-2 rounded bg="light-50" @click="goPage('search')">
      <uni-icons type="search" size="15"></uni-icons>
    </div>
    <div p-2 flex-center shadow-xl rounded bg="light-50" @click="goPage(name)">
      <uni-icons :type="icon" size="15"></uni-icons>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { default: 'list' },
  icon: { default: 'list' },
})
let value = $('')
let range = $([
  { value: 0, text: '篮球' },
  { value: 1, text: '足球' },
  { value: 2, text: '游泳' },
])
function change(e) {
  console.log('🐛 ~ file: index.vue ~ line 24 ~ src', e)
}
function goPage(name) {
  app.to(name)
}
</script>

<style lang="scss"></style>

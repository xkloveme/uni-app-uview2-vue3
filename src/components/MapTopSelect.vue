<template>
  <uni-search-bar
    rounded
    bgColor="#fff"
    placeholder="搜索点位"
    class="text-sm"
    @confirm="search"
    @input="input"
    @cancel="cancel"
  ></uni-search-bar>
  <div w-full flex-center px-2>
    <uni-data-select
      v-model="value1"
      w-2
      shadow-xl
      rounded
      bg="light-50"
      placeholder="全部区域"
      :localdata="range1"
      @change="change1"
    ></uni-data-select>
    <uni-data-select
      v-model="value2"
      mx-2
      shadow-xl
      rounded
      bg="light-50"
      class="text-sm"
      placeholder="全部路线"
      :localdata="range2"
      @change="change2"
    ></uni-data-select>
    <!-- <div p-2 flex-center shadow-xl mx-2 rounded bg="light-50" @click="goPage('search')">
      <uni-icons type="search" size="15"></uni-icons>
    </div> -->
    <div p-2 flex-center shadow-xl rounded bg="light-50" @click="goPage(name)">
      <uni-icons :type="icon" :size="app.Global.FontSizeNum == 16 ? 15 : 20"></uni-icons>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { default: 'list' },
  icon: { default: 'list' },
})
const emit = defineEmits(['changeSelect'])
let value1 = ''
let value2 = ''
let range1 = [
  { value: null, text: '全部区域' },
  { value: '嘉善', text: '嘉善' },
  { value: '吴江', text: '吴江' },
  { value: '青浦', text: '青浦' },
]
let range2 = [
  { value: null, text: '全部路线' },
  { value: '清廉实践线', text: '清廉实践线' },
  { value: '清廉教育线', text: '清廉教育线' },
  { value: '红色文化线', text: '红色文化线' },
  { value: '清廉传承线', text: '清廉传承线' },
]
let input = $('')
function search(e) {
  app.User.addName(e.value)
  emit('changeSelect', e.value)
}
function cancel() {
  app.User.addName('')
  emit('changeSelect', '取消搜索')
}
function change1(e) {
  app.User.addArea(e)
  emit('changeSelect', e === null ? '全部' : e)
}
function change2(e) {
  app.User.addLine(e)
  emit('changeSelect', e === null ? '全部' : e)
}
function goPage(name) {
  app.User.addName('')
  app.User.addLine('')
  app.User.addArea('')
  app.to(name, { name: props.name })
}
</script>

<style lang="scss" scoped>
:deep(.uni-searchbar__box) {
  border: 1px solid #e5e5e5 !important;
}
</style>

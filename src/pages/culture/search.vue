<template>
  <meta title="搜索点位" />
  <uni-search-bar placeholder="搜索点位" @confirm="search" @input="input"></uni-search-bar>
</template>

<script setup>
let input = $('')
function search(e) {
  console.log('🐛 ~ file: index.vue ~ line 24 ~ src', e)
}
</script>

<style lang="scss"></style>

<template>
  <meta title="搜索点位" navigationStyle="custom" />
  <uni-search-bar placeholder="搜索点位" @confirm="search" @input="input"></uni-search-bar>
</template>

<script setup>
import { useQuery } from '@/hooks'
const { data } = $(useQuery())
let input = $('')
function search(e) {
  app.User.addName(e.value)
  app.to(data.name == 'index' ? 'list' : 'index')
}
</script>

<style lang="scss"></style>

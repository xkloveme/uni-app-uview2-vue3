<template>
  <meta title="清廉文化地图" navigationStyle="custom" />
  <wt-map ref="wtMaps" />
  <div fixed top-12 left-0 right-0>
    <MapTopSelect @changeSelect="init" />
  </div>
</template>

<script setup>
import MapTopSelect from '@/components/MapTopSelect'

let wtMaps = ref(null)
function init() {
  wtMaps.value?.getDataMap()
}
</script>

<style lang="scss"></style>

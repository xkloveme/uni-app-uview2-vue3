<template>
  <meta title="清廉文化地图" navigationStyle="custom" />
  <sys>
    <template #fixed>
      <wt-map ref="wtMaps" />
      <div fixed top-0 left-0 right-0>
        <MapTopSelect @change-select="init" />
      </div>
    </template>
  </sys>
</template>

<script setup>
import MapTopSelect from '@/components/MapTopSelect'

let wtMaps = ref(null)
function init() {
  wtMaps.value?.getDataMap(true)
}
</script>

<style lang="scss"></style>

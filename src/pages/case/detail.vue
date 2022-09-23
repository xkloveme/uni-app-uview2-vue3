<template>
  <meta title="典型案例" navigationStyle="custom" />
  <video v-if="data.type == 'mp4'" id="myVideo" :src="data.url" w-full></video>
  <img v-else :src="data.url" mode="aspectFill" bg="light-50" h-full w-full />
  <!--  <div bg="light-50" h-full>
   <h2 text-center py-4>{{ deatil.title }}</h2>

    <div flex-center justify="center">
      <view mx-2>
        <uni-icons type="map-pin-ellipse" size="16"></uni-icons>
        嘉善
      </view>
      {{ deatil.time }}
    </div>
    <view p-5 pb-10>
      {{ deatil.html }}
    </view>
  </div> -->
</template>

<script setup>
import { useQuery } from '@/hooks'
const { data } = $(useQuery())
let videoContext = uni.createVideoContext('myVideo')
onUnload(() => videoContext.stop())
</script>

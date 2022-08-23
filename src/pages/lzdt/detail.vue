<template>
  <meta title="廉政动态" navigationStyle="custom" />
  <img :src="data.url" mode="aspectFill" bg="light-50" h-full w-full @click="app.back()" />
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
import SelectMap from '@/components/SelectMap'
const { data } = $(useQuery())
// ts-ignore
let deatil = ref({
  title: '关于xxxxxxxxx收受贿赂的案例',
  dd: '嘉善',
  time: '2022-07-22 21:34:51',
  html: `受贿罪是指国家工作人员利用职务上的便利，索取他人财物，或者非法收受他人财物，为他人谋取利益的行为。
受贿罪侵犯了国家工作人员职务行为的廉洁性及公私财物所有权。受贿罪严重影响国家机关的正常职能履行，损害国家机关的形象、声誉，同时也侵犯了一定的财产关 系。受贿罪在主观方面表现为故意，目的是非法占有公私财物。在客观方面表现为利用职务便利，索取他人财物，或非法收受他人财物为他人谋取利益。
“利用职务上的便利”，是指利用本人职务范围内的权力，即自己职务上主管、负责或者承办某项公共事务的职权及其所形成的便利条件。`,
})
console.log('🐛 ~ file: index.vue ~ line 14 ~ src', data)
</script>

<!--
 * @Author: xkloveme
 * @Date: 2022-04-21 11:52:46
 * @LastEditTime: 2022-09-23 15:16:48
 * @LastEditors: xkloveme
 * @Description: uni-section
 * @FilePath: /js-zlb-h5/src/components/wt-ui/wt-section.vue
 * @Copyright © xkloveme
-->
<template>
  <view class="uni-section">
    <view class="uni-section-header" nvue>
      <view v-if="type" class="uni-section__head">
        <view :class="type" class="uni-section__head-tag" />
      </view>
      <view class="uni-section__content">
        <text
          :class="{ distraction: !subTitle }"
          :style="{ color: color }"
          class="uni-section__content-title text-sm"
        >
          {{ title }}
        </text>
        <view :style="{ marginLeft: margin ? '10px' : '' }">
          <slot />
        </view>
        <text v-if="subTitle" class="uni-section__content-sub">{{ subTitle }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * Section 标题栏
 * @description 标题栏
 * @property {String} type = [line|circle] 标题装饰类型
 * 	@value line 竖线
 * 	@value circle 圆形
 * @property {String} title 主标题
 * @property {String} subTitle 副标题
 */
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#333',
  },
  subTitle: {
    type: String,
    default: '',
  },
  margin: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['click'])
function onClick() {
  emit('click')
}
</script>

<style lang="scss">
$uni-primary: #2979ff !default;

.uni-section {
  background-color: #fff;
  // overflow: hidden;
  margin-top: 10px;
}

.uni-section-header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 10px;
  // height: 50px;
  font-weight: normal;
}

.uni-section__head {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.line {
  height: 12px;
  background-color: $uni-primary;
  border-radius: 10px;
  width: 4px;
}

.circle {
  width: 8px;
  height: 8px;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: $uni-primary;
}

.uni-section__content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  color: #333;
}

.uni-section__content-title {
  color: $uni-primary;
}

.distraction {
  flex-direction: row;
  align-items: center;
}

.uni-section__content-sub {
  font-size: 12px;
  color: #999;
  line-height: 16px;
  margin-top: 2px;
}
</style>

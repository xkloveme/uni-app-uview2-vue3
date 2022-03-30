<template>
  <meta title="表单页面" />
  <u--form :model="form" ref="uForm" :rules="rules">
    <u-form-item label="姓名" prop="name"><u-input v-model="form.name" /></u-form-item>
    <u-form-item label="简介"><u-input v-model="form.intro" /></u-form-item>
    <u-form-item label="性别"><u-input v-model="form.sex" type="select" /></u-form-item>
    <u-form-item label="水果">
      <u-checkbox-group>
        <u-checkbox
          :customStyle="{ marginBottom: '8px' }"
          v-for="(item, index) in checkboxList"
          :key="index"
          :label="item.name"
          :name="item.name"
        ></u-checkbox>
      </u-checkbox-group>
    </u-form-item>
    <u-form-item label="味道">
      <u-radio-group v-model="radio">
        <u-radio
          v-for="(item, index) in radioList"
          :key="index"
          :name="item.name"
          :label="item.name"
          :disabled="item.disabled"
        ></u-radio>
      </u-radio-group>
    </u-form-item>
    <u-form-item label="开关"><u-switch slot="right" v-model="switchVal"></u-switch></u-form-item>
  </u--form>
  <u-button @click="submit">提交</u-button>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  intro: '',
  sex: '',
})
const checkboxList = reactive([
  {
    name: '苹果',
    checked: false,
    disabled: false,
  },
  {
    name: '雪梨',
    checked: false,
    disabled: false,
  },
  {
    name: '柠檬',
    checked: false,
    disabled: false,
  },
])
const radioList = reactive([
  {
    name: '鲜甜',
    disabled: false,
  },
  {
    name: '麻辣',
    disabled: false,
  },
])
const radio = ref('')
const switchVal = ref(false)

const rules = reactive({
  name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: ['blur', 'change'],
    },
  ],
})
const uForm = ref(null)
function submit() {
  uForm.value
    .validate()
    .then(res => {
      uni.$u.toast('校验通过')
    })
    .catch(errors => {
      uni.$u.toast('校验失败')
    })
}
</script>

<style lang="scss"></style>

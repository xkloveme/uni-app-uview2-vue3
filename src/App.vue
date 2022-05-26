<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
// console.log(__filename)
</script>
<style lang="scss">
@import '@/styles/color-ui.css';
@import '@/styles/index.scss';
</style>

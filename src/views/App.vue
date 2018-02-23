<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class App extends Vue {}
</script>
<style lang="scss">
@import '~normalize.css/normalize'; // normalize.css 样式格式化
</style>

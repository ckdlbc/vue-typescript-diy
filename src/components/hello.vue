<template>
  <div class="hello">
    Hello
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Hello extends Vue {
  mounted() {
    console.log('hello')
  }
}
</script>
<style lang="scss" scoped>
.hello {
  text-align: center;
  font-size: 20px;
}
</style>

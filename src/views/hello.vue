<template>
  <div>
    <hello></hello>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import hello from '../components/hello.vue'
@Component({
  components: {
    hello
  }
})
export default class Hello extends Vue {}
</script>
<style lang="scss" scoped>

</style>

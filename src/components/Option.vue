<template lang="pug">
  .option
    slot
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Option extends Vue {}
</script>

<style lang="scss" scoped>
.option {
  padding: 12px 15px;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #f6f6f6;
  }
}
</style>

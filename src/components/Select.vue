<template lang="pug">
  .select(
    :class="{ opened }",
    @click.stop="open"
  )
    .placeholder {{ placeholder }}
    img(class="arrow", src="@/assets/down-arrow.svg")
    .items
      Option First
      Option Second
      Option Third
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Option from "@/components/Option.vue";

@Component({
  components: {
    Option
  }
})
export default class Select extends Vue {
  @Prop({ default: "Pick one", type: String })
  readonly placeholder!: string;

  opened = false;

  open() {
    this.opened = true;
  }
  close() {
    this.opened = false;
  }

  mounted() {
    this.addDocumentListeners();
  }

  destroyed() {
    this.removeDocumentListeners();
  }

  removeDocumentListeners() {
    document.removeEventListener("click", this.documentClickHandler);
  }

  addDocumentListeners() {
    document.addEventListener("click", this.documentClickHandler);
  }

  documentClickHandler() {
    this.close();
  }
}
</script>

<style lang="scss" scoped>
$selectRadius: 3px;

.select {
  background: #fff;
  cursor: pointer;
  width: 100%;
  padding: 15px 10px;
  border-radius: $selectRadius;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  position: relative;
  &.opened {
    .items {
      display: flex;
    }
    .arrow {
      transform: translateY(-50%) rotate(-180deg);
    }
  }
}
.arrow {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: auto;
  transition: all 300ms;
}
.items {
  display: none;
  position: absolute;
  top: calc(100% - 3px);
  background: #fff;
  height: auto;
  max-height: 300px;
  width: 100%;
  left: 0;
  flex-direction: column;
  overflow: auto;

  border-bottom-right-radius: $selectRadius;
  border-bottom-left-radius: $selectRadius;
}
</style>

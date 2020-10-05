<template lang="pug">
  .select(
    :class="{ opened, mobile, selected, disabled }",
    @click.stop="open"
  )
    select(
      :name="name",
      :value="value",
      :disabled="disabled",
      @input="pick(getOptionByValue($event.target.value))",
      @focus="open"
    )
      option(
        v-for="(option, i) in options",
        :key="i",
        :value="getItemValue(option)",
      ) {{ getItemText(option) }}

    slot(v-bind="{ selectedText, selected }", name="placeholder")
      .placeholder {{ selectedText }}
    img(class="arrow", src="@/assets/down-arrow.svg")

    .items
      .no-data(v-if="!options.length") {{ noDataText }}
      div(
        v-for="(option, i) in options",
        :key="i",
        @click.stop="pick(option)"
      )
        slot(
          v-bind="{ selected, option, i, cursorOnOption: cursor === i }",
          name="option"
        )
          Option(
            :class="{'cursor-on-option': i === cursor, 'is-selected': getItemValue(option) === value}"
          ) {{ getItemText(option) }}
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Model,
  Emit,
  Watch
} from "vue-property-decorator";
import Option from "@/components/Option.vue";
import {
  KEYS,
  OptionItem,
  ObjectItem,
  Primitive,
  isMobile
} from "@/components/common";

@Component({
  components: {
    Option
  }
})
export default class Select extends Vue {
  @Prop({ default: "No data", type: String }) readonly noDataText!: string;

  @Prop({ default: "name", type: String }) readonly name!: string;

  @Prop({ default: false, type: Boolean })
  readonly disabled!: boolean;

  @Prop({ default: () => [], type: Array }) readonly options!: OptionItem[];

  @Prop({ default: "Pick one", type: String })
  readonly placeholder!: string;

  @Prop({ default: "label", type: String })
  readonly labelKey!: keyof OptionItem;

  @Prop({ default: "value", type: String })
  readonly valueKey!: keyof OptionItem;

  @Model("change", { type: [String, Number] })
  readonly value!: Primitive;

  opened = false;
  cursor = 0;
  mobile = isMobile();

  mounted() {
    this.addDocumentListeners();
  }

  destroyed() {
    this.removeDocumentListeners();
  }

  get hasSelected() {
    return this.selected !== undefined;
  }

  get selected() {
    return this.getOptionByValue(this.value);
  }

  get selectedText() {
    return this.selected?.[this.labelKey] || this.selected || this.placeholder;
  }

  getOptionByValue(value: Primitive) {
    return this.options.find(
      option =>
        (option as ObjectItem)?.[this.valueKey] === value || option === value
    );
  }

  getItemValue(item: OptionItem) {
    return item?.[this.valueKey] || item;
  }

  getItemText(item: OptionItem) {
    return item?.[this.labelKey] || item;
  }

  @Watch("opened")
  @Watch("selected")
  private selectedUpdated() {
    this.setCursor(0);
  }

  setCursor(cursor: number) {
    if (cursor >= this.options.length) {
      this.cursor = 0;
      return;
    }
    if (cursor < 0) {
      this.cursor = this.options.length - 1;
      return;
    }
    this.cursor = cursor;
  }

  @Emit("change")
  @Emit("input")
  pick(item: OptionItem) {
    this.close();
    return this.getItemValue(item);
  }

  open() {
    if (this.disabled) {
      return;
    }
    this.opened = true;
  }
  close() {
    this.opened = false;
  }

  removeDocumentListeners() {
    document.removeEventListener("click", this.documentClickHandler);
    document.removeEventListener("keydown", this.documentKeydownHandler);
  }

  addDocumentListeners() {
    document.addEventListener("click", this.documentClickHandler);
    document.addEventListener("keydown", this.documentKeydownHandler);
  }

  documentKeydownHandler(e: KeyboardEvent) {
    if (!this.opened) {
      return;
    }
    if (e.keyCode === KEYS.esc) {
      this.close();
    }
    if (e.keyCode === KEYS.enter) {
      this.pick(this.options[this.cursor]);
    }
    if (e.keyCode === KEYS.down) {
      this.setCursor(this.cursor + 1);
    }
    if (e.keyCode === KEYS.up) {
      this.setCursor(this.cursor - 1);
    }
    e.preventDefault();
  }

  documentClickHandler() {
    this.close();
  }
}
</script>

<style lang="scss" scoped>
$selectRadius: 3px;

select {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  left: 0;
  top: 0;
}

option {
  display: none;
}

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
  &.selected {
    .placeholder {
      opacity: 1;
    }
  }
  &.disabled {
    pointer-events: none;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.02);
    .arrow {
      filter: grayscale(1);
    }
  }
  &.mobile {
    option {
      display: block;
    }
    .items {
      display: none;
    }
  }
}
.placeholder {
  opacity: 0.5;
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
.cursor-on-option {
  background: #f6f6f6;
}
.is-selected {
  font-weight: bold;
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
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  background: #f6f6f6;
  color: #999;
}
</style>

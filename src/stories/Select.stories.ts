import { storiesOf } from "@storybook/vue";
import Select from "@/components/Select.vue";
import { options, stringOptions } from "@/assets/options";
import Option from "@/components/Option.vue";

storiesOf("Select", module)
  .add("default", () => ({
    components: {
      Select
    },
    template: `
      <Select placeholder="Placeholder" no-data-text="Custom no data" />
  `
  }))
  .add("with object list", () => ({
    components: {
      Select
    },
    data: () => ({
      options: options,
      selected: ""
    }),
    template: `
        <Select v-model="selected" :options="options" label-key="label" value-key="value" />
      `
  }))
  .add("with string list", () => ({
    components: {
      Select
    },
    data: () => ({
      options: stringOptions,
      selected: ""
    }),
    template: `
      <Select v-model="selected" :options="options" />
    `
  }))
  .add("disabled", () => ({
    components: {
      Select
    },
    template: `
        <Select :disabled="true" />
      `
  }))
  .add("custom placeholder", () => ({
    components: {
      Select
    },
    template: `
        <Select>
          <template #placeholder="props">
            <h3>🙂 {{ props.selectedText }}</h3>
          </template>
        </Select>
      `
  }))
  .add("custom option", () => ({
    components: {
      Select,
      Option
    },
    data: () => ({
      options: stringOptions,
      selected: ""
    }),
    template: `
    <Select v-model="selected" :options="options">
      <template #option="props">
        <OptionItem>
          🙂 {{ props.option }}
        </OptionItem>
      </template>
    </Select>
  `
  }));

import { storiesOf } from "@storybook/vue";
import Select from "@/components/Select.vue";
import { options, stringOptions } from "@/assets/options";

storiesOf("Select", module)
  .add("default", () => ({
    components: {
      Select
    },
    template: `
      <Select placeholder="Placeholder" />
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
        {{ selected }}
        <Select v-model="selected" :options="options" />
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
  }));

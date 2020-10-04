import {storiesOf} from "@storybook/vue";
import Select from "@/components/Select.vue";

storiesOf('Select', module).add('default', () => ({
  components: {
    Select
  },
  template: `
      <Select placeholder="Placeholder" />
  `
}))


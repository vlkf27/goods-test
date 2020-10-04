import { mount, Wrapper } from "@vue/test-utils";
import Select from "@/components/Select.vue";
import { numberOptions, options, stringOptions } from "@/assets/options";

const genPickTest = (props: any, text: string, checkedValue: any) => {
  describe(text, () => {
    let wrapper: Wrapper<Select>;
    beforeEach(() => {
      wrapper = mount(Select, {
        propsData: props
      });
    });

    it("Check list length", () => {
      wrapper.trigger("click");
      expect(wrapper.findAll(".option")).toHaveLength(stringOptions.length);
    });

    it("Pick first option", () => {
      wrapper.trigger("click");
      const option = wrapper.find(".option");
      option.trigger("click");
      expect((wrapper.emitted().change as any)[0][0]).toBe(checkedValue);
    });
  });
};

genPickTest(
  { options: stringOptions },
  "Select.vue with list of strings",
  stringOptions[0]
);
genPickTest(
  { options: numberOptions },
  "Select.vue with list of numbers",
  numberOptions[0]
);
genPickTest(
  { options: options },
  "Select.vue with list of objects",
  options[0].value
);

import { mount, Wrapper } from "@vue/test-utils";
import Select from "@/components/Select.vue";
import { numberOptions, options, stringOptions } from "@/assets/options";
import { KEYS } from "@/components/common";

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

    it("Keyboard navigation test", () => {
      const type = (code: number) => {
        document.dispatchEvent(
          new KeyboardEvent("keydown", { keyCode: code } as KeyboardEventInit)
        );
      };

      wrapper.trigger("click");

      expect(wrapper.vm.cursor).toBe(0);

      type(KEYS.down);

      expect(wrapper.vm.cursor).toBe(1);

      type(KEYS.esc);

      expect(wrapper.vm.opened).toBe(false);

      wrapper.trigger("click");
      wrapper.vm.setCursor(0);

      expect(wrapper.vm.cursor).toBe(0);
      type(KEYS.up);
      type(KEYS.up);
      expect(wrapper.vm.cursor).toBe(options.length - 2);

      type(KEYS.down);
      type(KEYS.down);
      type(KEYS.down);
      expect(wrapper.vm.cursor).toBe(1);
      type(KEYS.up);
      expect(wrapper.vm.cursor).toBe(0);
      type(KEYS.enter);
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

import { shallowMount, Wrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import Select from "@/components/Select.vue";

describe("Select.vue", () => {
  it("Drop-down menu click", () => {
    const wrapper: Wrapper<Select> = mount(Select);
    wrapper.trigger("click");
    expect(wrapper.vm.opened).toBe(true);
    expect(wrapper.find(".items").isVisible()).toBe(true);
  });

  it("Renders placeholder when passed", () => {
    const placeholder = "Placeholder";
    const wrapper = shallowMount(Select, {
      propsData: { placeholder }
    });
    expect(wrapper.text()).toMatch(placeholder);
  });
});

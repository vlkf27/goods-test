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

  it("Check disabled state", () => {
    const wrapper = shallowMount(Select, {
      propsData: { disabled: true }
    });
    expect(wrapper.classes()).toContain('disabled')
    wrapper.trigger("click");
    expect(wrapper.vm.opened).toBe(false);
  });

  it("Test custom placeholder slot", () => {
    const placeholder = "Custom placeholder";
    const wrapper = shallowMount(Select, {
      slots: {
        placeholder: "<h5>Custom placeholder</h5>"
      }
    });
    expect(wrapper.find("h5").text()).toMatch(placeholder);
  });


  it("Test custom no-data prop", () => {
    const text = "Custom no data";
    const wrapper = shallowMount(Select, {
      propsData: {
        noDataText: text
      }
    });
    expect(wrapper.find(".no-data").text()).toMatch(text);
  });

  it("Test custom placeholder slot", () => {
    const optionText = "Custom placeholder";
    const wrapper = shallowMount(Select, {
      slots: {
        option: `<h5>${optionText}</h5>`
      },
      propsData: {
        options: ['hello']
      }
    });
    wrapper.trigger("click");
    expect(wrapper.find("h5").text()).toMatch(optionText);
  });
});

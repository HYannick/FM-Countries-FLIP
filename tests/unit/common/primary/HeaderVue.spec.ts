import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import VueRouter from "vue-router";
import { HeaderComponent, HeaderVue } from "@/common/primary/header";

let wrapper: Wrapper<HeaderComponent>;
let headerComponent: HeaderComponent;

const wrap = () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  wrapper = shallowMount<HeaderComponent>(HeaderVue, {
    localVue
  });
  headerComponent = wrapper.vm;
};

describe("App Vue", () => {
  it("Should be a vue instance", () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("Should set dark mode", () => {
    wrap();
    headerComponent.toggleTheme(true);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    headerComponent.toggleTheme(false);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});

import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import VueRouter from "vue-router";
import { SearchVue, SearchComponent } from "@/common/primary/search";

let wrapper: Wrapper<SearchComponent>;
let searchComponent: SearchComponent;

const wrap = () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  wrapper = shallowMount<SearchComponent>(SearchVue, {
    localVue
  });
  searchComponent = wrapper.vm;
};

describe("Search Vue", () => {
  it("Should be a vue instance", () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("Should set search query", () => {
    wrap();
    searchComponent.setQuery("Tai");
    expect(searchComponent.query).toEqual("Tai");
  });
  it("Should send query", () => {
    wrap();
    searchComponent.setQuery("Tai");
    searchComponent.sendQuery();
    expect(wrapper.emitted().query).toBeTruthy();
    expect(wrapper.emitted().query[0]).toEqual(["Tai"]);
  });
});

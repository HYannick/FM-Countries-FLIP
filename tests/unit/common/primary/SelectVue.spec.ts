import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import VueRouter from "vue-router";
import { SelectComponent, SelectVue } from '@/common/primary/select';


let wrapper: Wrapper<SelectComponent>;
let selectComponent: SelectComponent;
const mockedRegions = [
  'Asia',
  'Africa',
  'Americas',
  'Europe',
  'Oceania'
];
const wrap = () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  wrapper = shallowMount<SelectComponent>(SelectVue, {
    propsData: {
      options: mockedRegions
    },
    localVue
  });
  selectComponent = wrapper.vm;
};

describe("Select Vue", () => {
  it("Should be a vue instance", () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("Should get select options", () => {
    wrap();
    expect(selectComponent.selectOptions).toEqual([
      {label:'Asia', value: 'asia'},
      {label:'Africa', value: 'africa' },
      {label:'Americas', value: 'americas' },
      {label:'Europe', value: 'europe' },
      {label:'Oceania', value: 'oceania' },
    ]);
  });
  it("Should send query", () => {
    wrap();
    selectComponent.change("africa");
    expect(wrapper.emitted().change).toBeTruthy();
    expect(wrapper.emitted().change[0]).toEqual(['africa']);
  });
});

import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import VueRouter, { RouteConfig } from "vue-router";
import { AppComponent, AppVue } from "@/common/primary/app";
import { routes } from "@/router";

const supressBeforeEnter = (route: RouteConfig): void => {
  delete route.beforeEnter;
  if (route.children) {
    route.children.forEach(supressBeforeEnter);
  }
};

export const routesWithoutBeforeEnter = (
  routes: RouteConfig[]
): RouteConfig[] => {
  routes.forEach(supressBeforeEnter);
  return routes;
};

let wrapper: Wrapper<AppComponent>;
let appComponent: AppComponent;

const wrap = (giverRouter?: VueRouter) => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = giverRouter || new VueRouter();
  wrapper = shallowMount<AppComponent>(AppVue, {
    localVue,
    router
  });
  appComponent = wrapper.vm;
};

const wrapOk = (giverRouter?: VueRouter) => {
  wrap(giverRouter);
};

describe("App Vue", () => {
  it("Should be a vue instance", () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("Should identify a company", () => {
    const router = new VueRouter({
      routes: routesWithoutBeforeEnter(routes)
    });
    router.push({ name: "countries" });
    wrapOk(router);

    expect(appComponent.identity).toBe("countries");
  });
});

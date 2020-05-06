import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { CountriesVue } from "@/country/primary";
import { CountryDetailsVue } from "@/country/primary/country-details";

Vue.use(VueRouter);
export const countriesRoute = {
  path: "/",
  name: "countries",
  component: CountriesVue
};

export const countryDetails = {
  path: "/:countryName",
  name: "countries.country",
  component: CountryDetailsVue,
  props: true
};

export const routes: Array<RouteConfig> = [countriesRoute, countryDetails];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;

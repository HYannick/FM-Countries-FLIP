import Vue from "vue";
import router from "./router";
import axios from "axios";
import { CountryResource } from "@/country/secondary/CountryResource";
import { AppVue } from "@/common/primary/app";
import { FLIP } from "@/common/primary/FLIP";

Vue.config.productionTip = false;

const backendAxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_BASE_URL
});

new Vue({
  router,
  render: h => h(AppVue),
  provide: {
    countryRepository: () => new CountryResource(backendAxiosInstance),
    FLIP
  }
}).$mount("#app");

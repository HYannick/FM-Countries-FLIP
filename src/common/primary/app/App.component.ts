import { Component, Vue } from "vue-property-decorator";
import { HeaderVue } from "@/common/primary/header";
import { CountryData } from "@/country/primary/CountriesDataSet";

@Component({
  components: {
    HeaderVue
  }
})
export default class AppComponent extends Vue {
  currentCountry: CountryData | null = null;
  position: DOMRect | null = null;

  get identity(): string | undefined {
    return this.$route.name!;
  }
}

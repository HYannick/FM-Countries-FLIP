import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import { CountryRepository } from "@/country/domain/CountryRepository";
import { CountryName } from "@/country/domain/CountryName";
import { CountryData, toCountryData } from "@/country/primary/CountriesDataSet";
import anime from "animejs";
// @ts-ignore
import charming from "charming";
import { FLIPAnimation, FLIPParams } from "@/common/primary/FLIP";

const defaultCountryDetails = {
  borderCountries: [],
  capital: "",
  currencies: "",
  flagPicture: "",
  id: "",
  languages: "",
  name: "",
  nativeName: "",
  population: 0,
  region: "",
  subRegion: "",
  topLevelDomain: ""
};
@Component
export default class CountryDetailsComponent extends Vue {
  @Prop({
    type: Object,
    default: null
  })
  public countryDetails!: CountryData;

  @Prop()
  position!: { flag: DOMRect; bg: DOMRect };

  @Prop()
  countryName!: CountryName;

  @Inject()
  countryRepository!: () => CountryRepository;

  public countryInfos: CountryData | null = null;

  @Inject()
  FLIP!: (
    el: HTMLElement,
    oldPos: DOMRect,
    params?: FLIPParams
  ) => FLIPAnimation;

  created() {
    if (!this.countryDetails && this.$route.params.countryName) {
      this.countryRepository()
        .getCountry(this.$route.params.countryName)
        .then(country => {
          this.countryInfos = toCountryData(country);
        });
    } else {
      this.countryInfos = this.countryDetails;
    }
  }

  mounted() {
    this.FLIP(this.$refs["picture"] as HTMLElement, this.position.flag, {
      duration: 1000
    }).play();
    this.FLIP(this.$refs["overlay"] as HTMLElement, this.position.bg, {
      duration: 800
    }).play();
    this.animateTitle();
  }

  private animateTitle() {
    const titleEl = this.$refs["title"] as HTMLElement;
    charming(titleEl);
    const titleLetters: HTMLElement[] = Array.from(
      titleEl.querySelectorAll("span")
    );
    titleLetters.forEach((letter, i) => {
      anime({
        targets: letter,
        opacity: [0, 1],
        translateY: [i % 2 === 0 ? 10 : -10, 0],
        delay: 200,
        easing: "easeOutQuart"
      });
    });
  }

  goBack() {
    const picture = this.$refs["picture"] as HTMLElement;
    const background = this.$refs["overlay"] as HTMLElement;
    this.$emit("goBack", {
      id: this.countryDetails.id,
      oldPos: {
        flag: picture.getBoundingClientRect(),
        bg: background.getBoundingClientRect()
      }
    });
  }
}

import { Component, Inject, Vue } from "vue-property-decorator";
import {
  CountriesDataSet,
  CountryData,
  toCountryDataSet
} from "@/country/primary/CountriesDataSet";
import { CountryRepository } from "@/country/domain/CountryRepository";
import { SearchVue } from "@/common/primary/search";
import { Countries } from "@/country/domain/Country";
import { CountryDetailsVue } from "@/country/primary/country-details";
import { FLIPAnimation, FLIPParams } from "@/common/primary/FLIP";
import anime from "animejs";

@Component({
  components: {
    SearchVue,
    CountryDetailsVue
  }
})
export default class CountriesComponent extends Vue {
  public countriesList: CountriesDataSet = [];

  @Inject()
  countryRepository!: () => CountryRepository;

  @Inject()
  FLIP!: (
    el: HTMLElement,
    oldPos: DOMRect,
    params?: FLIPParams
  ) => FLIPAnimation;

  currentCountry: CountryData | null = null;
  position: {
    flag: DOMRect | null;
    bg: DOMRect | null;
  } = {
    flag: null,
    bg: null
  };

  openDetails = false;
  descAnimation: any;

  loadSearchResults(query: string) {
    if (!query) {
      this.getAllCountries();
      return;
    }
    this.countryRepository()
      .searchByCountryName(query)
      .then(countries => this.from(countries));
  }

  created(): void {
    this.getAllCountries();
  }

  private from(countries: Countries) {
    this.countriesList = toCountryDataSet(countries);
  }

  private getAllCountries() {
    this.countryRepository()
      .listAll()
      .then(countries => this.from(countries));
  }

  navigate(country: CountryData) {
    const [cardImage]: any = this.$refs[`card-image-${country.id}`];
    const [cardContainer]: any = this.$refs[`card-bg-${country.id}`];
    this.position.flag = cardImage.getBoundingClientRect();
    this.position.bg = cardContainer.getBoundingClientRect();
    this.currentCountry = country;
    this.descAnimation = [
      cardContainer.parentNode.querySelectorAll("h4")
    ].concat(Array.from(cardContainer.parentNode.querySelectorAll("p")));
    anime({
      targets: this.descAnimation,
      translateY: -20,
      opacity: 0,
      delay: anime.stagger(50),
      easing: "easeOutExpo",
      update: this.openCountryDetails
    });
  }

  openCountryDetails(anim: { progress: number }) {
    if (anim.progress >= 30) {
      this.openDetails = true;
      document.querySelector("body")!.style.overflowY = "hidden";
    }
  }

  async closeDetails({
    id,
    oldPos
  }: {
    id: string;
    oldPos: { flag: DOMRect; bg: DOMRect };
  }) {
    document.querySelector("body")!.style.overflowY = "scroll";
    this.openDetails = false;
    this.resetData();
    const [cardImage]: any = this.$refs[`card-image-${id}`];
    const [cardContainer]: any = this.$refs[`card-bg-${id}`];
    cardContainer.parentNode.style.zIndex = "8";
    anime({
      targets: this.descAnimation,
      translateY: 0,
      opacity: 1,
      delay: anime.stagger(50, { start: 100 }),
      easing: "easeOutExpo"
    });

    await Promise.all([
      this.FLIP(cardImage, oldPos.flag, { duration: 800 }).play({
        promisify: true
      }),
      this.FLIP(cardContainer, oldPos.bg, { duration: 800 }).play({
        promisify: true
      })
    ]);
    cardContainer.parentNode.style.zIndex = "0";
  }

  resetData() {
    this.currentCountry = null;
    this.position = {
      flag: null,
      bg: null
    };
  }
}

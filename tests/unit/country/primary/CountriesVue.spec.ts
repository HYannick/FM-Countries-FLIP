import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import { CountriesVue, CountriesComponent } from "@/country/primary";
import { SinonStubbedInstance } from "sinon";
import { CountryRepository } from "@/country/domain/CountryRepository";
import sinon from "sinon";
import { createCountry } from "../domain/country.fixture";
import { toCountryData } from "@/country/primary/CountriesDataSet";
import { FLIPAnimation } from "@/common/primary/FLIP";
import { mockDOMRect } from "../../utils";

let wrapper: Wrapper<CountriesComponent>;
let countriesComponent: CountriesComponent;
let $router: any;
const wrap = (
  countryRepository: SinonStubbedInstance<CountryRepository>,
  FLIP: FLIPAnimation
) => {
  const localVue = createLocalVue();
  $router = {
    push: sinon.stub()
  };
  wrapper = shallowMount<CountriesComponent>(CountriesVue, {
    localVue,
    provide: {
      countryRepository: () => countryRepository,
      FLIP: () => FLIP
    },
    mocks: {
      $router,
      $refs: {
        "card-image-1": [],
        "card-bg-1": []
      }
    }
  });
  countriesComponent = wrapper.vm;
};

const wrapOk = () => {
  const countryRepository: any = {
    listAll: sinon.stub(),
    listByRegion: sinon.stub(),
    searchByCountryName: sinon.stub(),
    getCountry: sinon.stub()
  };

  const FLIP: any = {
    play: sinon.stub()
  };

  FLIP.play.resolves("OK");

  countryRepository.listAll.resolves([
    createCountry(1),
    createCountry(2, "France", "Europe"),
    createCountry(3, "New Zealand", "Oceania")
  ]);
  countryRepository.searchByCountryName.resolves([
    createCountry(2, "France", "Europe"),
    createCountry(3, "New Zealand", "Oceania")
  ]);
  wrap(countryRepository, FLIP);
  return { countryRepository, FLIP };
};

describe("Countries Vue", () => {
  it("Should be a vue instance", () => {
    wrapOk();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Should get all countries", async () => {
    await wrapOk();
    expect(countriesComponent.countriesList.length).toBe(3);
    expect(countriesComponent.countriesList[0].name).toBe("Taiwan");
    expect(countriesComponent.countriesList[1].name).toBe("France");
    expect(countriesComponent.countriesList[2].name).toBe("New Zealand");
  });

  it("Should load search results", async () => {
    await wrapOk();
    await countriesComponent.loadSearchResults("Tai");
    expect(countriesComponent.countriesList.length).toBe(2);
    expect(countriesComponent.countriesList[0].name).toBe("France");
    await countriesComponent.loadSearchResults("");
    expect(countriesComponent.countriesList.length).toBe(3);
  });

  it("Should trigger country navigation", async () => {
    await wrapOk();
    const country = toCountryData(createCountry(1));
    await wrapper.vm.$nextTick();
    countriesComponent.navigate(country);
    countriesComponent.openCountryDetails({ progress: 20 });
    expect(countriesComponent.openDetails).toBeFalsy();
    countriesComponent.openCountryDetails({ progress: 90 });
    expect(countriesComponent.openDetails).toBeTruthy();
  });

  it("Should init closeDetails on details close", async () => {
    await wrapOk();
    const country = toCountryData(createCountry(1));
    await wrapper.vm.$nextTick();
    countriesComponent.navigate(country);
    await countriesComponent.closeDetails({
      id: "1",
      oldPos: {
        flag: mockDOMRect(),
        bg: mockDOMRect()
      }
    });
    await wrapper.vm.$nextTick();
    expect(countriesComponent.openDetails).toBeFalsy();
    expect(countriesComponent.currentCountry).toBe(null);
    expect(countriesComponent.position).toEqual({
      flag: null,
      bg: null
    });
  });
});

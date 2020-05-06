import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import {
  CountryDetailsVue,
  CountryDetailsComponent
} from "@/country/primary/country-details";
import { SinonStubbedInstance } from "sinon";
import { CountryRepository } from "@/country/domain/CountryRepository";
import sinon from "sinon";
import { createCountry } from "../../domain/country.fixture";
import { CountryData, toCountryData } from "@/country/primary/CountriesDataSet";
import { mockDOMRect } from "../../../utils";
import { FLIPAnimation } from "@/common/primary/FLIP";

let wrapper: Wrapper<CountryDetailsComponent>;
let countryDetailsComponent: CountryDetailsComponent;

const wrap = (
  countryRepository: SinonStubbedInstance<CountryRepository>,
  flipAnimation: FLIPAnimation,
  countryDetails?: CountryData
) => {
  const localVue = createLocalVue();
  wrapper = shallowMount<CountryDetailsComponent>(CountryDetailsVue, {
    localVue,
    propsData: {
      countryName: "Taiwan",
      countryDetails: toCountryData(createCountry(1)),
      position: {
        flag: mockDOMRect(),
        bg: mockDOMRect()
      }
    },
    provide: {
      countryRepository: () => countryRepository,
      FLIP: () => flipAnimation
    },
    mocks: {
      $route: {
        name: "countries.country",
        params: {
          countryDetails: JSON.stringify(countryDetails)
        }
      }
    }
  });
  countryDetailsComponent = wrapper.vm;
};

const wrapOk = () => {
  const countryRepository: any = {
    getCountry: sinon.stub()
  };
  const FLIP = {
    play: sinon.stub()
  };
  countryRepository.getCountry.resolves(createCountry(1));
  wrap(countryRepository, FLIP);
  return { countryRepository };
};

describe("Country Details Vue", () => {
  it("Should be a vue instance", () => {
    wrapOk();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  // it("Should get current country by API", async () => {
  //   const { countryRepository } = await wrapOk();
  //   expect(countryRepository.getCountry.getCalls().length).toBe(1);
  //   expect(countryRepository.getCountry.getCall(0).args).toEqual(["Taiwan"]);
  //   expect(countryDetailsComponent.countryDetails).toMatchObject({
  //     id: "1",
  //     name: "Taiwan",
  //     flagPicture: "https://restcountries.eu/data/twn.svg",
  //     nativeName: "臺灣",
  //     population: 23503349,
  //     region: "Asia",
  //     subRegion: "Eastern Asia",
  //     capital: "Taipei",
  //     topLevelDomain: ".tw",
  //     currencies: "New Taiwan dollar",
  //     languages: "Chinese, English",
  //     borderCountries: [
  //       "Andorra",
  //       "Belgium",
  //       "Germany",
  //       "Italy",
  //       "Luxembourg",
  //       "Monaco",
  //       "Spain",
  //       "Switzerland"
  //     ]
  //   });
  // });

  it("Should get current country props", async () => {
    const countryRepository: any = {
      getCountry: sinon.stub()
    };
    const FLIP = {
      play: sinon.stub()
    };
    await wrap(countryRepository, FLIP, toCountryData(createCountry(1)));
    expect(countryDetailsComponent.countryDetails).toMatchObject({
      id: "1",
      name: "Taiwan",
      flagPicture: "https://restcountries.eu/data/twn.svg",
      nativeName: "臺灣",
      population: 23503349,
      region: "Asia",
      subRegion: "Eastern Asia",
      capital: "Taipei",
      topLevelDomain: ".tw",
      currencies: "New Taiwan dollar",
      languages: "Chinese, English",
      borderCountries: [
        "Andorra",
        "Belgium",
        "Germany",
        "Italy",
        "Luxembourg",
        "Monaco",
        "Spain",
        "Switzerland"
      ]
    });
  });

  it("Should emit close event", () => {
    wrapOk();
    countryDetailsComponent.goBack();
    expect(wrapper.emitted().goBack).toBeTruthy();
  });
});

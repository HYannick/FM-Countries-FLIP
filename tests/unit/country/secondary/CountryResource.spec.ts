import sinon from "sinon";
import { createRestCountry } from "../domain/country.fixture";
import { Country } from "@/country/domain/Country";
import { CountryResource } from "@/country/secondary/CountryResource";

describe("CountryResource", () => {
  it("Should get country list", async () => {
    const axios: any = {
      get: sinon.stub()
    };

    axios.get.resolves({
      data: [
        createRestCountry("Taiwan"),
        createRestCountry("France", true, true),
        createRestCountry("Vietnam", true)
      ]
    });

    const countryResource = new CountryResource(axios);
    const countryList: Country[] = await countryResource.listAll();
    const uri = axios.get.getCall(0).args[0];
    expect(uri).toBe("/v2/all");
    expect(countryList.length).toBe(3);
    expect(countryList[0].name).toBe("Taiwan");
    expect(countryList[0].languages).toEqual(["Chinese", "English"]);
    expect(countryList[1].borderCountries).toEqual([
      "AND",
      "BEL",
      "DEU",
      "ITA",
      "LUX",
      "MCO",
      "ESP",
      "CHE"
    ]);
  });

  it("Should get countries by region", async () => {
    const axios: any = {
      get: sinon.stub()
    };

    axios.get.resolves({
      data: [
        createRestCountry("Taiwan", false, false, "Asia"),
        createRestCountry("Vietnam", true, true, "Asia")
      ]
    });

    const countryResource = new CountryResource(axios);
    const countriesList = await countryResource.listByRegion("Asia");
    const uri = axios.get.getCall(0).args[0];
    expect(uri).toBe("/v2/region/asia");
    expect(countriesList.length).toBe(2);
  });

  it("Should get countryList results", async () => {
    const axios: any = {
      get: sinon.stub()
    };

    axios.get.resolves({
      data: [
        createRestCountry("Taiwan", false, false, "Asia"),
        createRestCountry(
          "Lao People's Democratic Republic",
          false,
          false,
          "Asia"
        )
      ]
    });
    const countryResource = new CountryResource(axios);
    const countriesList = await countryResource.searchByCountryName("Tai");
    const uri = axios.get.getCall(0).args[0];
    expect(uri).toBe("/v2/name/tai");
    expect(countriesList.length).toBe(2);
  });

  it("Should get country results", async () => {
    const axios: any = {
      get: sinon.stub()
    };

    axios.get.resolves({
      data: [createRestCountry("Taiwan", true, true, "Asia")]
    });
    const countryResource = new CountryResource(axios);
    const country = await countryResource.getCountry("Taiwan");
    const uri = axios.get.getCall(0).args[0];
    expect(uri).toBe("/v2/name/taiwan");
    expect(country).toEqual({
      id: "158",
      name: "Taiwan",
      flag: "https://restcountries.eu/data/twn.svg",
      nativeName: "臺灣",
      population: 23503349,
      region: "Asia",
      subRegion: "Eastern Asia",
      capital: "Taipei",
      topLevelDomain: [".tw"],
      currencies: [
        {
          code: "TWD",
          name: "New Taiwan dollar",
          symbol: "$"
        }
      ],
      languages: ["Chinese", "English"],
      borderCountries: ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"]
    });
  });
});

export const COUNTRIES_LIST_ALL_URL = "**/v2/all";

export const createCountry = (
  id: number,
  name = "Taiwan",
  region = "Asia"
) => ({
  numericCode: id.toString(),
  name,
  flag: "https://restcountries.eu/data/twn.svg",
  nativeName: "臺灣",
  population: 23503349,
  region,
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
  languages: [
    {
      iso639_1: "zh",
      iso639_2: "zho",
      name: "Chinese",
      nativeName: "中文 (Zhōngwén)"
    },
    {
      iso639_1: "en",
      iso639_2: "en",
      name: "English",
      nativeName: "English"
    }
  ],
  borderCountries: ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"]
});

const countriesListResponse = [
  createCountry(1, "Taiwan"),
  createCountry(2, "France"),
  createCountry(3, "New Zealand")
];

export const mockCountriesList = (response: any) =>
  cy.route("GET", COUNTRIES_LIST_ALL_URL, response);
export const mockExistingRestCountries = () =>
  mockCountriesList(countriesListResponse);

export const countriesListSelectors = {
  cardContainer: '[data-selector="country-card"]',
  country: (id: number) => ({
    container: `[data-id="country-card-${id}"]`,
    picture: `[data-selector="country-card-${id}.picture"]`,
    name: `[data-selector="country-card-${id}.name"]`,
    population: `[data-selector="country-card-${id}.population"]`,
    region: `[data-selector="country-card-${id}.region"]`,
    capital: `[data-selector="country-card-${id}.capital"]`
  })
};

export const visitCountriesList = () => {
  cy.server();
  mockExistingRestCountries().as("countriesList");
  cy.visit("/");
  cy.wait("@countriesList");
};

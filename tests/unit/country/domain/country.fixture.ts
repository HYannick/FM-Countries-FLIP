import { RestCountry } from "@/country/secondary/RestCountry";
import { Country } from "@/country/domain/Country";

export const createRestCountry = (
  name = "Taiwan",
  withBorders = true,
  withRegionBlock = true,
  region = "Asia"
): RestCountry => ({
  name,
  topLevelDomain: [".tw"],
  alpha2Code: "TW",
  alpha3Code: "TWN",
  callingCodes: ["886"],
  capital: "Taipei",
  altSpellings: [
    "TW",
    "Táiwān",
    "Republic of China",
    "中華民國",
    "Zhōnghuá Mínguó"
  ],
  region,
  subregion: "Eastern Asia",
  population: 23503349,
  latlng: [23.5, 121],
  demonym: "Taiwanese",
  area: 36193,
  gini: null,
  timezones: ["UTC+08:00"],
  borders: withBorders
    ? ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"]
    : [],
  nativeName: "臺灣",
  numericCode: "158",
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
  translations: {
    de: "Taiwan",
    es: "Taiwán",
    fr: "Taïwan",
    ja: "台湾（中華民国）",
    it: "Taiwan",
    br: "Taiwan",
    pt: "Taiwan",
    nl: "Taiwan",
    hr: "Tajvan",
    fa: "تایوان"
  },
  flag: "https://restcountries.eu/data/twn.svg",
  regionalBlocs: withRegionBlock
    ? [
        {
          acronym: "EFTA",
          name: "European Free Trade Association",
          otherAcronyms: [],
          otherNames: []
        }
      ]
    : [],
  cioc: "TPE"
});

export const createCountry = (
  id: number,
  name = "Taiwan",
  region = "Asia"
): Country => ({
  id: id.toString(),
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
  languages: ["Chinese", "English"],
  borderCountries: ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"]
});

import { Countries } from "@/country/domain/Country";

export interface RestCurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface RestRegionBloc {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
}

export interface RestLanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface RestCountry {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number | null;
  gini: number | null;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: RestCurrency[];
  languages: RestLanguage[];
  translations: {
    [key: string]: string;
  };
  flag: string;
  regionalBlocs: RestRegionBloc[];
  cioc: string;
}

export type RestCountries = RestCountry[];

export const toCountry = (restCountry: RestCountry) => ({
  id: restCountry.numericCode,
  name: restCountry.name,
  flag: restCountry.flag,
  nativeName: restCountry.nativeName,
  population: restCountry.population,
  region: restCountry.region,
  subRegion: restCountry.subregion,
  capital: restCountry.capital,
  topLevelDomain: restCountry.topLevelDomain,
  currencies: restCountry.currencies,
  languages: restCountry.languages.map(language => language.name),
  borderCountries: restCountry.borders
});

export const toCountries = (restCountries: RestCountries): Countries =>
  restCountries.map(toCountry);

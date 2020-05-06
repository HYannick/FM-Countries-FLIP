import { Countries, Country } from "@/country/domain/Country";
import { countryNames } from "./country_names";

export interface CountryData {
  id: string;
  name: string;
  flagPicture: string;
  nativeName: string;
  population: number;
  region: string;
  subRegion: string;
  capital: string;
  topLevelDomain: string;
  currencies: string;
  languages: string;
  borderCountries: string[];
}

export type CountriesDataSet = CountryData[];

export const toCountryData = (country: Country): CountryData => ({
  id: country.id,
  name: country.name,
  flagPicture: country.flag,
  nativeName: country.nativeName,
  population: country.population,
  region: country.region,
  subRegion: country.subRegion,
  capital: country.capital,
  topLevelDomain: country.topLevelDomain.join(", "),
  currencies: country.currencies.map(currency => currency.name).join(", "),
  languages: country.languages.join(", "),
  borderCountries: country.borderCountries.map(
    countryCode => countryNames[countryCode]
  )
});
export const toCountryDataSet = (countries: Countries): CountriesDataSet =>
  countries.map(toCountryData);

import { CountryName } from "@/country/domain/CountryName";
import { Region } from "@/country/domain/Region";
import { Currency } from "@/country/domain/Currency";
import { Language } from "@/country/domain/Language";

export interface Country {
  id: string;
  name: CountryName;
  flag: string;
  nativeName: string;
  population: number;
  region: Region;
  subRegion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: Currency[];
  languages: Language[];
  borderCountries: CountryName[];
}

export type Countries = Country[];

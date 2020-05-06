import { CountryData } from "@/country/primary/CountriesDataSet";

export interface CountryBus {
  setCurrentCountry(country: CountryData, pos: DOMRect): void;
  clearCountry(pos: DOMRect): void;
}

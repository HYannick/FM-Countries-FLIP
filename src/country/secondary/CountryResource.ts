import { CountryRepository } from "@/country/domain/CountryRepository";
import { Countries, Country } from "@/country/domain/Country";
import { AxiosInstance } from "axios";
import {
  RestCountries,
  toCountries,
  toCountry
} from "@/country/secondary/RestCountry";
import { Region } from "@/country/domain/Region";
import { CountryName } from "@/country/domain/CountryName";

export class CountryResource implements CountryRepository {
  constructor(private backendCaller: AxiosInstance) {}

  listAll(): Promise<Countries> {
    return this.backendCaller
      .get<RestCountries>("/all")
      .then(({ data }) => toCountries(data));
  }

  listByRegion(region: Region): Promise<Countries> {
    const escapedRegion = region.toLowerCase();
    return this.backendCaller
      .get<RestCountries>(`/region/${escapedRegion}`)
      .then(({ data }) => toCountries(data));
  }

  searchByCountryName(query: string): Promise<Countries> {
    const escapedName = query.toLowerCase();
    return this.backendCaller
      .get<RestCountries>(`/name/${escapedName}`)
      .then(({ data }) => toCountries(data));
  }

  getCountry(countryName: CountryName): Promise<Country> {
    const escapedCountryName = countryName.toLowerCase();
    return this.backendCaller
      .get<RestCountries>(`/name/${escapedCountryName}`)
      .then(({ data: [country] }) => toCountry(country));
  }
}

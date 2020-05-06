import { Countries, Country } from "@/country/domain/Country";
import { Region } from "@/country/domain/Region";
import { CountryName } from "@/country/domain/CountryName";

export interface CountryRepository {
  listAll(): Promise<Countries>;
  listByRegion(region: Region): Promise<Countries>;
  searchByCountryName(query: string): Promise<Countries>;
  getCountry(countryName: CountryName): Promise<Country>;
}

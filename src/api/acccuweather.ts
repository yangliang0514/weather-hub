import axios from "axios";

const domain = import.meta.env.VITE_ACCUWEATHER_DOMAIN;

export interface citiesInfo {
  key: string;
  city: string;
  parentCity: string;
  country: string;
  lat: number;
  lng: number;
}

export async function fetchCitiesSearch(
  searchText: string,
): Promise<citiesInfo[]> {
  const { data: results } = await axios.get(domain, {
    params: { q: searchText, language: "zh-tw" },
  });

  return results.map((result: any) => ({
    key: result["Key"],
    city: result["LocalizedName"],
    parentCity: result["ParentCity"]["LocalizedName"],
    country: result["Country"]["LocalizedName"],
    lat: result["GeoPosition"]["Latitude"],
    lng: result["GeoPosition"]["Longitude"],
  }));
}

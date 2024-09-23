import axios from "axios";

const domain = import.meta.env.VITE_ACCUWEATHER_DOMAIN;

export async function fetchCitiesSearch(searchText: string) {
  const { data } = await axios.get(domain, {
    params: { q: searchText },
  });
  return data;
}

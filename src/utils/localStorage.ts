import { citiesInfo } from "@/api/acccuweather";

export function storeRecentSearches(info: citiesInfo) {
  const results = localStorage.getItem("recentSearches");
  const data: citiesInfo[] = results ? JSON.parse(results) : [];
  const filteredData = data.filter((el) => el.key !== info.key);
  const updatedData = [info, ...filteredData].slice(0, 3);

  localStorage.setItem("recentSearches", JSON.stringify(updatedData));
}

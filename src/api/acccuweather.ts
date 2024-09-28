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

export interface CurrentCondition {
  weatherText: string;
  weatherIcon: number;
  temperature: number;
  realFeelTemp: number;
  realFeelTempShade: number;
  windDirection: string;
  windSpeed: string;
  windGustSpeed: string;
}

export async function fetchCitiesSearch(
  searchText: string,
): Promise<citiesInfo[]> {
  const { data: results } = await axios.get(
    `${domain}/locations/v1/cities/search`,
    {
      params: { q: searchText, language: "zh-tw" },
    },
  );

  return results.map((result: any) => ({
    key: result["Key"],
    city: result["LocalizedName"],
    parentCity: result["ParentCity"]["LocalizedName"],
    country: result["Country"]["LocalizedName"],
    lat: result["GeoPosition"]["Latitude"],
    lng: result["GeoPosition"]["Longitude"],
  }));
}

export async function fetchCurrentCondition(
  locationKey: string,
): Promise<CurrentCondition> {
  const {
    data: [result],
  } = await axios.get(`${domain}/currentconditions/v1/${locationKey}`, {
    params: { language: "zh-tw", details: true },
  });

  console.log(result);

  return {
    weatherText: result["WeatherText"],
    weatherIcon: result["WeatherIcon"],
    temperature: result["Temperature"]["Metric"]["Value"],
    realFeelTemp: result["RealFeelTemperature"]["Metric"]["Value"],
    realFeelTempShade: result["RealFeelTemperatureShade"]["Metric"]["Value"],
    windDirection: result["Wind"]["Direction"]["Localized"],
    windSpeed: result["Wind"]["Speed"]["Metric"]["Value"],
    windGustSpeed: result["WindGust"]["Speed"]["Metric"]["Value"],
  };
}

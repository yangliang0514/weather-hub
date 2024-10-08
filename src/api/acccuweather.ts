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
  windSpeed: number;
  windGustSpeed: number;
}

export interface ForecastSummary {
  headline: string;
  forecasts: DailyForecast[];
}

export interface DailyForecast {
  date: Date;
  minTemp: number;
  maxTemp: number;
  minRealFeelTemp: number;
  maxRealFeelTemp: number;
  day: WeatherInfo;
  night: WeatherInfo;
}

interface WeatherInfo {
  icon: number;
  phrase: string;
  rainProbability: number;
  windSpeed: number;
  windDirection: string;
  cloudCover: number;
  rain: number;
}

export interface HourlyForecast {
  date: Date;
  icon: number;
  iconText: string;
  temp: number;
  realFeelTemp: number;
  rainProbability: number;
  windDirection: string;
  windSpeed: number;
  windGustSpeed: number;
  humidity: number;
  visibility: number;
  rain: number;
  cloudCover: number;
  dewPoint: number;
  UVIndexText: string;
}

export async function fetchLocation(
  locationKey: string | undefined,
): Promise<{ city: string; parentCity: string } | null> {
  if (!locationKey) return null;

  const { data } = await axios.get(`${domain}/locations/v1/${locationKey}`, {
    params: { language: "zh-tw" },
  });

  if (!data) return null;

  return {
    city: data["LocalizedName"],
    parentCity: data["AdministrativeArea"]["LocalizedName"],
  };
}

export async function fetchCitiesSearch(
  searchText: string,
): Promise<citiesInfo[]> {
  const { data: results } = await axios.get(
    `${domain}/locations/v1/cities/search`,
    { params: { q: searchText, language: "zh-tw" } },
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

export async function fetch5DaysDailyForecast(
  locationKey: string,
): Promise<ForecastSummary> {
  const { data: result } = await axios.get(
    `${domain}/forecasts/v1/daily/5day/${locationKey}`,
    { params: { language: "zh-tw", details: true, metric: true } },
  );

  return {
    headline: result["Headline"]["Text"],
    forecasts: result["DailyForecasts"].map(
      (forecast: any): DailyForecast => ({
        date: new Date(forecast["Date"]),
        minTemp: forecast["Temperature"]["Minimum"]["Value"],
        maxTemp: forecast["Temperature"]["Maximum"]["Value"],
        maxRealFeelTemp: forecast["RealFeelTemperature"]["Maximum"]["Value"],
        minRealFeelTemp: forecast["RealFeelTemperature"]["Minimum"]["Value"],
        day: {
          icon: forecast["Day"]["Icon"],
          phrase: forecast["Day"]["ShortPhrase"],
          rainProbability: forecast["Day"]["RainProbability"],
          windSpeed: forecast["Day"]["Wind"]["Speed"]["Value"],
          windDirection: forecast["Day"]["Wind"]["Direction"]["Localized"],
          cloudCover: forecast["Day"]["CloudCover"],
          rain: forecast["Day"]["Rain"]["Value"],
        },
        night: {
          icon: forecast["Night"]["Icon"],
          phrase: forecast["Night"]["ShortPhrase"],
          rainProbability: forecast["Night"]["RainProbability"],
          windSpeed: forecast["Night"]["Wind"]["Speed"]["Value"],
          windDirection: forecast["Night"]["Wind"]["Direction"]["Localized"],
          cloudCover: forecast["Night"]["CloudCover"],
          rain: forecast["Night"]["Rain"]["Value"],
        },
      }),
    ),
  };
}

export async function fetch12HoursHourlyForecast(
  locationKey: string,
): Promise<HourlyForecast[]> {
  const { data: result } = await axios.get(
    `${domain}/forecasts/v1/hourly/12hour/${locationKey}`,
    { params: { language: "zh-tw", details: true, metric: true } },
  );

  return result.map(
    (forecast: any): HourlyForecast => ({
      date: new Date(forecast["DateTime"]),
      icon: forecast["WeatherIcon"],
      iconText: forecast["IconPhrase"],
      temp: forecast["Temperature"]["Value"],
      realFeelTemp: forecast["RealFeelTemperature"]["Value"],
      windDirection: forecast["Wind"]["Direction"]["Localized"],
      windSpeed: forecast["Wind"]["Speed"]["Value"],
      windGustSpeed: forecast["WindGust"]["Speed"]["Value"],
      rain: forecast["Rain"]["Value"],
      rainProbability: forecast["RainProbability"],
      humidity: forecast["RelativeHumidity"],
      visibility: forecast["Visibility"]["Value"],
      cloudCover: forecast["CloudCover"],
      dewPoint: forecast["DewPoint"]["Value"],
      UVIndexText: forecast["UVIndexText"],
    }),
  );
}

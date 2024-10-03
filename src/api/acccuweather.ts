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

export interface ForcastSummary {
  headline: string;
  forcasts: DailyForcast[];
}

export interface DailyForcast {
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
  windGustSpeed: number;
}

export interface HourlyForcast {
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

export async function fetch5DaysDailyForcast(
  locationKey: string,
): Promise<ForcastSummary> {
  const { data: result } = await axios.get(
    `${domain}/forecasts/v1/daily/5day/${locationKey}`,
    { params: { language: "zh-tw", details: true, metric: true } },
  );

  return {
    headline: result["Headline"]["Text"],
    forcasts: result["DailyForecasts"].map(
      (forcast: any): DailyForcast => ({
        date: new Date(forcast["Date"]),
        minTemp: forcast["Temperature"]["Minimum"]["Value"],
        maxTemp: forcast["Temperature"]["Maximum"]["Value"],
        maxRealFeelTemp: forcast["RealFeelTemperature"]["Minimum"]["Value"],
        minRealFeelTemp: forcast["RealFeelTemperature"]["Minimum"]["Value"],
        day: {
          icon: forcast["Day"]["Icon"],
          phrase: forcast["Day"]["ShortPhrase"],
          rainProbability: forcast["Day"]["RainProbability"],
          windSpeed: forcast["Day"]["Wind"]["Speed"]["Value"],
          windDirection: forcast["Day"]["Wind"]["Direction"]["Localized"],
          windGustSpeed: forcast["Day"]["WindGust"]["Speed"]["Value"],
        },
        night: {
          icon: forcast["Night"]["Icon"],
          phrase: forcast["Night"]["ShortPhrase"],
          rainProbability: forcast["Night"]["RainProbability"],
          windSpeed: forcast["Night"]["Wind"]["Speed"]["Value"],
          windDirection: forcast["Night"]["Wind"]["Direction"]["Localized"],
          windGustSpeed: forcast["Night"]["WindGust"]["Speed"]["Value"],
        },
      }),
    ),
  };
}

export async function fetch12HoursHourlyForcast(
  locationKey: string,
): Promise<HourlyForcast[]> {
  const { data: result } = await axios.get(
    `${domain}/forecasts/v1/hourly/12hour/${locationKey}`,
    { params: { language: "zh-tw", details: true, metric: true } },
  );

  return result.map(
    (forcast: any): HourlyForcast => ({
      date: new Date(forcast["DateTime"]),
      icon: forcast["WeatherIcon"],
      iconText: forcast["IconPhrase"],
      temp: forcast["Temperature"]["Value"],
      realFeelTemp: forcast["RealFeelTemperature"]["Value"],
      windDirection: forcast["Wind"]["Direction"]["Localized"],
      windSpeed: forcast["Wind"]["Speed"]["Value"],
      windGustSpeed: forcast["WindGust"]["Speed"]["Value"],
      rain: forcast["Rain"]["Value"],
      rainProbability: forcast["RainProbability"],
      humidity: forcast["RelativeHumidity"],
      visibility: forcast["Visibility"]["Value"],
      cloudCover: forcast["CloudCover"],
      dewPoint: forcast["DewPoint"]["Value"],
      UVIndexText: forcast["UVIndexText"],
    }),
  );
}

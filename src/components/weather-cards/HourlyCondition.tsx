import WeatherIcon from "@/icons/WeatherIcon";
import { formatHour } from "@/utils/helpers";
import TemperatureDisplay from "./TemperatureDisplay";
import { DropletsIcon, ThermometerIcon } from "lucide-react";
import { HourlyForecast } from "@/api/acccuweather";

export default function HourlyCondition({
  forecast,
  isError,
  error,
}: {
  forecast: HourlyForecast;
  isError: boolean;
  error: Error | null;
}) {
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="col-span-3 min-h-64 space-y-4 rounded-lg bg-white p-4 shadow-md">
      <div className="border-b border-gray-200 pb-4">
        <span className="text-sm text-gray-600">
          {formatHour(forecast.date.getHours())}
        </span>
      </div>
      <div className="px-5 pt-3">
        <div className="flex items-start justify-between">
          <div className="flex items-end gap-3">
            <WeatherIcon iconNum={forecast.icon} className="h-20 w-20" />
            <div className="space-y-1">
              <TemperatureDisplay className="text-3xl" temp={forecast.temp} />
              <span className="ml-3 block text-xl">{forecast.iconText}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <ThermometerIcon className="inline h-5 w-5" /> 體感溫度{" "}
              <TemperatureDisplay temp={forecast.realFeelTemp} />
            </div>
            <p>
              <DropletsIcon className="inline h-5 w-5" /> 降雨機率{" "}
              {forecast.rainProbability} %
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-8">
        <div className="w-1/2 divide-y divide-gray-300">
          <div className="flex justify-between py-4">
            <span>風</span>
            <span>
              {forecast.windDirection} 每小時 {forecast.windSpeed} 公里
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span>雲量</span>
            <span> {forecast.cloudCover} %</span>
          </div>
          <div className="flex justify-between py-4">
            <span>露點溫度</span>
            <TemperatureDisplay temp={forecast.dewPoint} />
          </div>
          <div className="flex justify-between py-4">
            <span>雨量</span>
            <span>{forecast.rain} mm</span>
          </div>
        </div>
        <div className="w-1/2 divide-y divide-gray-300">
          <div className="flex justify-between py-4">
            <span>陣風</span>
            <span>每小時 {forecast.windGustSpeed} 公里</span>
          </div>
          <div className="flex justify-between py-4">
            <span>濕度</span>
            <span>{forecast.humidity} %</span>
          </div>
          <div className="flex justify-between py-4">
            <span>能見度</span>
            <span>{forecast.visibility} 公里</span>
          </div>
          <div className="flex justify-between py-4">
            <span>紫外線</span>
            <span>{forecast.UVIndexText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

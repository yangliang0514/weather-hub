import { DailyForecast } from "@/api/acccuweather";
import { LoaderCircle, ThermometerIcon } from "lucide-react";
import TemperatureDisplay from "./TemperatureDisplay";
import { formatDate } from "@/utils/helpers";
import WeatherIcon from "@/icons/WeatherIcon";

export default function DailyCondition({
  forecast,
  isLoading,
  isError,
  error,
}: {
  forecast: DailyForecast;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}) {
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="col-span-3 min-h-64 space-y-4 rounded-lg bg-white p-4 shadow-md">
      {isLoading || !forecast ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin" />
        </div>
      ) : (
        <>
          <div className="border-b border-gray-200 pb-4">
            <span className="text-sm text-gray-600">
              {formatDate(forecast.date)}
            </span>
          </div>
          <div className="px-1 pt-3">
            <div className="flex items-start justify-between">
              <div className="flex items-end gap-3">
                <div className="space-y-1">
                  <TemperatureDisplay
                    className="text-3xl"
                    temp={forecast.maxTemp}
                  />
                </div>
                <div className="space-y-1">
                  <TemperatureDisplay
                    className="text-xl"
                    temp={forecast.minTemp}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <ThermometerIcon className="inline h-5 w-5" /> 體感溫度{" "}
                  <TemperatureDisplay temp={forecast.minRealFeelTemp} /> ~{" "}
                  <TemperatureDisplay temp={forecast.maxRealFeelTemp} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-8 px-1 pt-3">
            <div className="w-1/2">
              <div className="flex items-center gap-1">
                <span>白天 - </span>{" "}
                <WeatherIcon iconNum={forecast.day.icon} className="h-5 w-5" />
                <span>{forecast.day.phrase}</span>
              </div>
              <div className="divide-y divide-gray-300 px-1">
                <div className="flex justify-between py-4">
                  <span>風</span>
                  <span>
                    {forecast.day.windDirection} 每小時 {forecast.day.windSpeed}{" "}
                    公里
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>降雨機率</span>
                  <span> {forecast.day.rainProbability} %</span>
                </div>
                <div className="flex justify-between py-4">
                  <span>雲量</span>
                  <span> {forecast.day.cloudCover} %</span>
                </div>
                <div className="flex justify-between py-4">
                  <span>雨量</span>
                  <span>{forecast.day.rain} mm</span>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex items-center gap-1">
                <span>夜晚 - </span>{" "}
                <WeatherIcon
                  iconNum={forecast.night.icon}
                  className="h-5 w-5"
                />
                <span>{forecast.night.phrase}</span>
              </div>
              <div className="divide-y divide-gray-300 px-1">
                <div className="flex justify-between py-4">
                  <span>風</span>
                  <span>
                    {forecast.night.windDirection} 每小時{" "}
                    {forecast.night.windSpeed} 公里
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>降雨機率</span>
                  <span> {forecast.night.rainProbability} %</span>
                </div>
                <div className="flex justify-between py-4">
                  <span>雲量</span>
                  <span> {forecast.night.cloudCover} %</span>
                </div>
                <div className="flex justify-between py-4">
                  <span>雨量</span>
                  <span>{forecast.night.rain} mm</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

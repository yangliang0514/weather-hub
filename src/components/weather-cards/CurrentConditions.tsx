import WeatherIcon from "@/icons/WeatherIcon";
import TemperatureDisplay from "./TemperatureDisplay";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentCondition } from "@/api/acccuweather";
import { LoaderCircle } from "lucide-react";

export default function CurrentConditions({
  locationKey,
}: {
  locationKey: string;
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["currentCondition", locationKey],
    queryFn: () => fetchCurrentCondition(locationKey),
  });

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="col-span-2 min-h-64 space-y-4 rounded-lg bg-white p-4 shadow-md">
      {isLoading || !data ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin" />
        </div>
      ) : (
        <>
          <div className="border-b border-gray-200 pb-4">
            <span className="text-sm text-gray-600">目前天氣</span>
          </div>
          <div className="flex justify-between pt-3">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <WeatherIcon iconNum={data.weatherIcon} className="h-24 w-24" />
                <TemperatureDisplay
                  className="text-6xl"
                  temp={data.temperature}
                />
              </div>
              <div className="flex justify-between space-x-1">
                <span className="ml-3 text-xl">{data.weatherText}</span>
                <div className="space-x-1">
                  <span className="text-gray-500">體感溫度</span>
                  <TemperatureDisplay temp={data.realFeelTemp} />
                </div>
              </div>
            </div>
            <div className="w-1/2 divide-y divide-gray-300">
              <div className="flex justify-between py-4">
                <span>陰涼溫度</span>
                <TemperatureDisplay temp={data.realFeelTempShade} />
              </div>
              <div className="flex justify-between py-4">
                <span>風</span>
                <span>
                  {data.windDirection} 每小時 {data.windSpeed} 公里
                </span>
              </div>
              <div className="flex justify-between py-4">
                <span>陣風</span>
                <span>每小時 {data.windGustSpeed} 公里</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
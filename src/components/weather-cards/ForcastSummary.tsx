import { fetch5DaysDailyForcast } from "@/api/acccuweather";
import WeatherIcon from "@/icons/WeatherIcon";
import { useQuery } from "@tanstack/react-query";
import { Droplets, LoaderCircle } from "lucide-react";

export default function ForcastSummary({
  locationKey,
}: {
  locationKey: string;
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["5-day-forcast", locationKey],
    queryFn: () => fetch5DaysDailyForcast(locationKey),
  });

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="col-span-1 space-y-6 rounded-lg bg-white p-4 shadow-md">
      {isLoading || !data ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin" />
        </div>
      ) : (
        <>
          <div className="border-b border-gray-200 pb-4">
            <span className="text-sm text-gray-600">未來一天</span>
          </div>
          <div className="flex flex-col divide-y divide-gray-300">
            <div className="flex items-center justify-between px-3 py-5">
              <span>白天</span>
              <div className="space-x-3">
                <WeatherIcon
                  iconNum={data.forcasts[0].day.icon}
                  className="inline h-10 w-10"
                />
                <span>{data.forcasts[0].day.phrase}</span>
              </div>
              <div className="space-x-1">
                <Droplets className="inline" />
                <span>{data.forcasts[0].day.rainProbability} %</span>
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-5">
              <span>晚上</span>
              <div className="space-x-3">
                <WeatherIcon
                  iconNum={data.forcasts[0].night.icon}
                  className="inline h-10 w-10"
                />
                <span>{data.forcasts[0].night.phrase}</span>
              </div>
              <div className="space-x-1">
                <Droplets className="inline" />
                <span>{data.forcasts[0].night.rainProbability} %</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
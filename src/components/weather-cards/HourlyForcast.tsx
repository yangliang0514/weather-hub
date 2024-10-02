import { fetch12HoursHourlyForcast } from "@/api/acccuweather";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Droplets, LoaderCircle } from "lucide-react";
import WeatherIcon from "@/icons/WeatherIcon";
import TemperatureDisplay from "./TemperatureDisplay";

export default function HourlyForcast({
  locationKey,
}: {
  locationKey: string;
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hourlyForcast", locationKey],
    queryFn: () => fetch12HoursHourlyForcast(locationKey),
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
            <span className="text-sm text-gray-600">每小時預報</span>
          </div>
          <Carousel className="mx-3">
            <CarouselContent>
              {data.map((forcast) => (
                <CarouselItem
                  key={forcast.date.toISOString()}
                  className="basis-1/3"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span>{formatTime(forcast.date.getHours())}</span>
                    <div>
                      <WeatherIcon
                        iconNum={forcast.icon}
                        className="h-10 w-10"
                      />
                      <TemperatureDisplay temp={forcast.temp} />
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="h-5 w-5" />
                      <span>{forcast.rainProbability} %</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-6" />
            <CarouselNext className="-right-6" />
          </Carousel>
        </>
      )}
    </div>
  );
}

function formatTime(time: number): string {
  if (time >= 0 && time <= 11) return `上午 ${time} 時`;
  return `下午 ${time - 12} 時`;
}

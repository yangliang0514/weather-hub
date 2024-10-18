import { fetch12HoursHourlyForecast } from "@/api/acccuweather";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Droplets } from "lucide-react";
import WeatherIcon from "@/icons/WeatherIcon";
import TemperatureDisplay from "./TemperatureDisplay";
import { formatHour } from "@/utils/helpers";
import LoadingCard from "./LoadingCard";
import ErrorCard from "../errors/ErrorCard";

export default function HourlyForecast({
  locationKey,
}: {
  locationKey: string;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["hourlyForecast", locationKey],
    queryFn: () => fetch12HoursHourlyForecast(locationKey),
  });

  if (isLoading || !data) return <LoadingCard className="col-span-1" />;

  if (isError) {
    return <ErrorCard className="col-span-1" queryKey="hourlyForecast" />;
  }

  return (
    <div className="col-span-1 space-y-6 rounded-lg bg-white p-4 shadow-md">
      <div className="border-b border-gray-200 pb-4">
        <span className="text-sm text-gray-600">每小時預報</span>
      </div>
      <Carousel className="mx-3">
        <CarouselContent>
          {data.map((forecast) => (
            <CarouselItem
              key={forecast.date.toISOString()}
              className="basis-1/3"
            >
              <div className="flex flex-col items-center gap-3">
                <span>{formatHour(forecast.date.getHours())}</span>
                <div>
                  <WeatherIcon iconNum={forecast.icon} className="h-10 w-10" />
                  <TemperatureDisplay temp={forecast.temp} />
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="h-5 w-5" />
                  <span>{forecast.rainProbability} %</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-6" />
        <CarouselNext className="-right-6" />
      </Carousel>
    </div>
  );
}

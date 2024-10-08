import { fetch12HoursHourlyForecast, HourlyForecast } from "@/api/acccuweather";
import HourlyCondition from "@/components/weather-cards/HourlyCondition";
import LoadingCard from "@/components/weather-cards/LoadingCard";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function Hourly() {
  const { cityId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hourlyForecast", cityId],
    queryFn: () => fetch12HoursHourlyForecast(cityId!),
  });

  if (!cityId) return <Navigate to="/" replace={true} />;

  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 px-3 py-5 text-gray-600 sm:grid-cols-3">
      {isLoading
        ? Array.from({ length: 12 }, (_, i) => (
            <LoadingCard key={i} className="col-span-3 min-h-96" />
          ))
        : data?.map((forecast: HourlyForecast) => (
            <HourlyCondition
              key={forecast.date.toISOString()}
              forecast={forecast}
              isError={isError}
              error={error}
            />
          ))}
    </main>
  );
}

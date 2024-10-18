import { DailyForecast, fetch5DaysDailyForecast } from "@/api/acccuweather";
import ErrorCard from "@/components/errors/ErrorCard";
import DailyCondition from "@/components/weather-cards/DailyCondition";
import LoadingCard from "@/components/weather-cards/LoadingCard";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function FiveDays() {
  const { cityId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["5-day-forecast", cityId],
    queryFn: () => fetch5DaysDailyForecast(cityId!),
  });

  if (!cityId) return <Navigate to="/" replace={true} />;

  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 px-3 py-5 text-gray-600 sm:grid-cols-3">
      {isLoading
        ? Array.from({ length: 5 }, (_, i) => (
            <LoadingCard key={i} className="col-span-3 min-h-96" />
          ))
        : data?.forecasts.map((forecast: DailyForecast) => (
            <DailyCondition
              key={forecast.date.toISOString()}
              forecast={forecast}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          ))}
      {isError && (
        <ErrorCard className="col-span-3" queryKey="5-day-forecast" />
      )}
    </main>
  );
}

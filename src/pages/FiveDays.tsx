import { DailyForcast, fetch5DaysDailyForcast } from "@/api/acccuweather";
import DailyCondition from "@/components/weather-cards/DailyCondition";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function FiveDays() {
  const { cityId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["5-day-forcast", cityId],
    queryFn: () => fetch5DaysDailyForcast(cityId!),
  });

  if (!cityId) return <Navigate to="/" replace={true} />;

  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 px-3 py-5 text-gray-600 sm:grid-cols-3">
      {data?.forcasts.map((forcast: DailyForcast) => (
        <DailyCondition
          key={forcast.date.toISOString()}
          forcast={forcast}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      ))}
    </main>
  );
}

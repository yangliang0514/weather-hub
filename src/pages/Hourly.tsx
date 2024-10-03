import { fetch12HoursHourlyForcast, HourlyForcast } from "@/api/acccuweather";
import HourlyCondition from "@/components/weather-cards/HourlyCondition";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

export default function Hourly() {
  const { cityId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hourlyForcast", cityId],
    queryFn: () => fetch12HoursHourlyForcast(cityId!),
  });

  if (!cityId) return <Navigate to="/" replace={true} />;

  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 px-3 py-5 text-gray-600 sm:grid-cols-3">
      {data?.map((forcast: HourlyForcast) => (
        <HourlyCondition
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

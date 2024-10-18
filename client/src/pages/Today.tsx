import CurrentConditions from "@/components/weather-cards/CurrentConditions";
import ForecastSummary from "@/components/weather-cards/ForecastSummary";
import HourlyForecast from "@/components/weather-cards/HourlyForecast";
import HourlyRainForecast from "@/components/weather-cards/HourlyRainForecast";
import { Navigate, useParams } from "react-router-dom";

export default function Today() {
  const { cityId } = useParams();

  if (!cityId) return <Navigate to="/" replace={true} />;

  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-y-5 px-3 py-5 text-gray-600 md:grid-cols-3 md:gap-x-5">
      <CurrentConditions locationKey={cityId} />
      <ForecastSummary locationKey={cityId} />
      <HourlyRainForecast locationKey={cityId} />
      <HourlyForecast locationKey={cityId} />
    </main>
  );
}

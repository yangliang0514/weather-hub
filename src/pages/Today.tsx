import CurrentConditions from "@/components/weather-cards/CurrentConditions";
import ForcastSummary from "@/components/weather-cards/ForcastSummary";
import { useParams } from "react-router-dom";

export default function Today() {
  const { cityId } = useParams();

  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 px-3 py-5 text-gray-600 sm:grid-cols-3">
      <CurrentConditions locationKey={cityId || ""} />
      <ForcastSummary />
    </main>
  );
}

import { useTempUnitContext } from "@/context/TempUnitProvider";
import { cn } from "@/lib/utils";

export default function TemperatureDisplay({
  temp,
  className,
}: {
  temp: number;
  className?: string;
}) {
  const { unit } = useTempUnitContext();

  const convertedTemp = unit === "fahrenheit" ? (temp * 9) / 5 + 32 : temp;
  const unitDisplay = unit === "fahrenheit" ? <>&deg;F</> : <>&deg;C</>;

  return (
    <div className={cn("inline-flex gap-1", className)}>
      <span className="">{Math.round(convertedTemp)}</span>
      <span className="">{unitDisplay}</span>
    </div>
  );
}

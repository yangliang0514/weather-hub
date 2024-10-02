import { useTempUnitContext } from "@/context/TempUnitProvider";
import { cn } from "@/lib/utils";

export default function TemperatureDisplay({
  temp,
  className,
  displayUnit = true,
}: {
  temp: number;
  className?: string;
  displayUnit?: boolean;
}) {
  const { unit } = useTempUnitContext();

  const convertedTemp = unit === "fahrenheit" ? (temp * 9) / 5 + 32 : temp;
  const unitDisplay = unit === "fahrenheit" ? "F" : "C";

  return (
    <div className={cn("inline-flex gap-1", className)}>
      <span>{Math.round(convertedTemp)}</span>
      <span>&deg;{displayUnit && unitDisplay}</span>
    </div>
  );
}

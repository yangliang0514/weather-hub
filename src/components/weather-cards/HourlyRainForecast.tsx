import { fetch12HoursHourlyForecast } from "@/api/acccuweather";
import { useQuery } from "@tanstack/react-query";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import LoadingCard from "./LoadingCard";

export default function HourlyRainForecast({
  locationKey,
}: {
  locationKey: string;
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hourlyForecast", locationKey],
    queryFn: () => fetch12HoursHourlyForecast(locationKey),
  });

  if (isError) return <div>Error: {error.message}</div>;

  if (isLoading || !data) return <LoadingCard className="col-span-2" />;

  const chartConfig = {
    rain: {
      label: "雨量",
      color: "#537eda",
    },
  } satisfies ChartConfig;

  const chartData = data?.map((forecast) => ({
    hour: `${forecast.date.getHours()}:00`,
    rain: forecast.rain,
  }));

  return (
    <div className="col-span-2 min-h-64 space-y-4 rounded-lg bg-white p-4 shadow-md">
      <div className="pb-4">
        <span className="text-sm text-gray-600">每小時雨量預報</span>
      </div>
      <ChartContainer config={chartConfig} className="max-h-48 w-full">
        <BarChart data={chartData}>
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value) => ["雨量 ", `${value} mm`]}
          />
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="hour"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <Bar
            dataKey="rain"
            fill="var(--color-rain)"
            radius={5}
            barSize={28}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

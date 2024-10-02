import { fetch12HoursHourlyForcast } from "@/api/acccuweather";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function HourlyRainForcast({
  locationKey,
}: {
  locationKey: string;
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hourlyForcast", locationKey],
    queryFn: () => fetch12HoursHourlyForcast(locationKey),
  });

  if (isError) return <div>Error: {error.message}</div>;

  const chartConfig = {
    rain: {
      label: "雨量",
      color: "#537eda",
    },
  } satisfies ChartConfig;

  const chartData = data?.map((forcast) => ({
    hour: `${forcast.date.getHours()}:00`,
    rain: forcast.rain,
  }));

  return (
    <div className="col-span-2 min-h-64 space-y-4 rounded-lg bg-white p-4 shadow-md">
      {isLoading || !data ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin" />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

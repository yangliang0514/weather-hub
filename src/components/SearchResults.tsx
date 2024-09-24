import { fetchCitiesSearch } from "@/api/acccuweather";
import { useQuery } from "@tanstack/react-query";

export default function SearchResults({ queryStr }: { queryStr: string }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["text-searches", queryStr],
    queryFn: () => fetchCitiesSearch(queryStr),
    enabled: !!queryStr,
  });

  if (isError) {
    return (
      <ul className="absolute top-full w-full divide-y divide-solid pt-2 text-gray-700">
        <li className="bg-white p-3">Error: {error.message}</li>
      </ul>
    );
  }

  return (
    <ul className="absolute top-full w-full divide-y divide-solid pt-2 text-gray-700">
      {isLoading ? (
        <li className="bg-white p-3">Loading...</li>
      ) : (
        data?.map(({ key, city, parentCity, country }) => (
          <li key={key} className="space-y-1 bg-white p-3">
            <span className="block text-lg font-semibold">{city}</span>
            <span className="block text-sm">
              {city}, {parentCity}, {country}
            </span>
          </li>
        ))
      )}
    </ul>
  );
}

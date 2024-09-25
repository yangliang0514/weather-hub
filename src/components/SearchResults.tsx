import { fetchCitiesSearch } from "@/api/acccuweather";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
          <li key={key} className="space-y-1 bg-white p-3 hover:bg-gray-300">
            <Link to={`/${key}/overview`}>
              <span className="block text-lg font-semibold">{city}</span>
              <span className="block text-sm">
                {city}, {parentCity}, {country}
              </span>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}

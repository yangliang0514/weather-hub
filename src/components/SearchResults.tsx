import { fetchCitiesSearch } from "@/api/acccuweather";
import { storeRecentSearches } from "@/utils/localStorage";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function SearchResults({
  queryStr,
  hideResults,
  clearInput,
}: {
  queryStr: string;
  hideResults: () => void;
  clearInput: () => void;
}) {
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
        data?.map((search) => (
          <li
            key={search.key}
            className="space-y-1 bg-white p-3 hover:bg-gray-300"
          >
            <Link
              to={`/${search.key}/today`}
              onClick={() => {
                storeRecentSearches(search);
                hideResults();
                clearInput();
              }}
            >
              <span className="block text-lg font-semibold">{search.city}</span>
              <span className="block text-sm">
                {search.city}, {search.parentCity}, {search.country}
              </span>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}

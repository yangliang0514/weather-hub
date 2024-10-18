import { fetchCitiesSearch, fetchLocationKeyGeo } from "@/api/acccuweather";
import { storeRecentSearches } from "@/utils/localStorage";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SearchResults({
  queryStr,
  hideResults,
  clearInput,
}: {
  queryStr: string;
  hideResults: () => void;
  clearInput: () => void;
}) {
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | "disallow" | null
  >(null);

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["text-searches", queryStr],
    queryFn: () => fetchCitiesSearch(queryStr),
    enabled: !!queryStr,
  });

  function handleLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      () => setLocation("disallow"),
      { enableHighAccuracy: true },
    );
  }

  useEffect(() => {
    if (location === null || location === "disallow") return;

    let ignore = false;

    fetchLocationKeyGeo(location.latitude, location.longitude)
      .then((locationKey) => {
        if (!ignore) navigate(`/${locationKey}/today`);
      })
      .catch(() => setLocation("disallow"));

    return () => {
      ignore = true;
    };
  }, [location, navigate]);

  if (isError) {
    return (
      <ul className="absolute top-full w-full divide-y divide-solid pt-2 text-gray-700">
        <li className="bg-white p-3">Error: {error.message}</li>
      </ul>
    );
  }

  return (
    <ul className="absolute top-full w-full divide-y divide-solid pt-2 text-gray-700">
      {location !== "disallow" && (
        <li
          onClick={handleLocation}
          className="flex items-center gap-2 bg-white p-3 hover:cursor-pointer hover:bg-gray-300"
        >
          <Navigation className="size-5 stroke-2" />{" "}
          <span>使用您目前的位置</span>
        </li>
      )}
      {isLoading ? (
        <li className="bg-white p-3">Loading...</li>
      ) : (
        <>
          {data?.length === 0 && <li className="bg-white p-3">找不到結果</li>}
          {data?.map((search) => (
            <Link
              key={search.key}
              className="block"
              to={`/${search.key}/today`}
              onClick={() => {
                storeRecentSearches(search);
                hideResults();
                clearInput();
              }}
            >
              <li className="space-y-1 bg-white p-3 hover:bg-gray-300">
                <span className="block text-lg font-semibold">
                  {search.city}
                </span>
                <span className="block text-sm">
                  {search.city}, {search.parentCity}, {search.country}
                </span>
              </li>
            </Link>
          ))}
        </>
      )}
    </ul>
  );
}

import { citiesInfo } from "@/api/acccuweather";
import { storeRecentSearches } from "@/utils/localStorage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecentSearches() {
  const [searches, setSearches] = useState<citiesInfo[] | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("recentSearches");
    if (storedData) setSearches(JSON.parse(storedData));
  }, []);

  if (!searches) return <></>;

  return (
    <div className="space-y-3">
      <h3>最近搜尋</h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {searches.map((search) => {
          return (
            <Link
              key={search.key}
              to={`${search.key}/today`}
              className="block"
              onClick={() => storeRecentSearches(search)}
            >
              <div className="rounded-lg bg-gray-600 bg-opacity-50 p-6 text-white hover:bg-opacity-65">
                <div className="text-lg font-bold">{search.city}</div>
                <div className="text-sm text-gray-300">{search.country}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

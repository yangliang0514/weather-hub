import { citiesInfo } from "@/api/acccuweather";
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
      {searches.map((search) => {
        return (
          <Link to={`${search.key}/overview`} className="block">
            <div key={search.key} className="grid grid-cols-3">
              <div className="rounded-lg bg-gray-600 bg-opacity-50 p-6 text-white">
                <div className="text-lg font-bold">{search.city}</div>
                <div className="text-sm text-gray-300">{search.country}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

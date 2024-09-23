import { fetchCitiesSearch } from "@/api/acccuweather";
import MagnifyingGlass from "@/icons/MagnifyingGlass";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useState("");

  const { data: results } = useSuspenseQuery({
    queryKey: ["search-results"],
    queryFn: () => fetchCitiesSearch(search),
  });

  return (
    <div className="flex">
      <form className="relative" action="">
        <input
          className="rounded-full border-opacity-30 bg-slate-400 bg-transparent bg-opacity-30 px-3 py-2 placeholder:text-center placeholder:text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white"
          type="text"
          placeholder="搜尋城市"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-2 hover:opacity-80"
        >
          <MagnifyingGlass />
        </button>
      </form>
      {/* <Suspense fallback={<div>Loading</div>}>
        {results.map((result) => (
          <div key={result.key}>{result.LocalizedName}</div>
        ))}
      </Suspense> */}
    </div>
  );
}

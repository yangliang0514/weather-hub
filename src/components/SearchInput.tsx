import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import SearchResults from "./SearchResults";
import MagnifyingGlass from "@/icons/MagnifyingGlass";

export default function SearchInput() {
  const [quertString, setQuertString] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(quertString, 1000);

  return (
    <div className="relative">
      <form>
        <input
          className="rounded-full border border-opacity-30 bg-slate-400 bg-transparent bg-opacity-30 px-3 py-2 placeholder:text-center placeholder:text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white"
          type="text"
          placeholder="搜尋城市"
          value={quertString}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQuertString(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-2 hover:opacity-80"
        >
          <MagnifyingGlass />
        </button>
      </form>
      {isFocused && debouncedQuery && (
        <SearchResults queryStr={debouncedQuery} />
      )}
    </div>
  );
}

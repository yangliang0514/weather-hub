import { useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import SearchResults from "./SearchResults";
import MagnifyingGlass from "@/icons/MagnifyingGlass";

export default function SearchInput() {
  const [quertString, setQuertString] = useState("");
  const [displayResults, setDisplayResults] = useState(false);
  const [debouncedQuery, setDebounceQuery] = useDebounce(quertString, 500);

  const ref = useRef<HTMLDivElement | null>(null);

  function handleClickOutside(e: MouseEvent) {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setDisplayResults(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDebounceQuery(quertString);
        }}
      >
        <input
          className="w-full rounded-full border border-opacity-30 bg-slate-400 bg-transparent bg-opacity-30 px-3 py-2 placeholder:text-center placeholder:text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white"
          type="text"
          placeholder="搜尋城市"
          value={quertString}
          onFocus={() => setDisplayResults(true)}
          onChange={(e) => setQuertString(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-2 hover:opacity-80"
        >
          <MagnifyingGlass />
        </button>
      </form>
      {displayResults && debouncedQuery && (
        <SearchResults
          queryStr={debouncedQuery}
          hideResults={() => setDisplayResults(false)}
          clearInput={() => setQuertString("")}
        />
      )}
    </div>
  );
}

import RecentSearches from "@/components/RecentSearches";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col items-center justify-center">
      <div className="w-1/3 space-y-5">
        <SearchInput />
        <RecentSearches />
      </div>
    </main>
  );
}

import RecentSearches from "@/components/RecentSearches";
import SearchInput from "@/components/SearchInput";
import Logo from "@/icons/Logo";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col items-center justify-center">
      <Logo />
      <div className="mt-10 w-1/3 space-y-5">
        <SearchInput />
        <RecentSearches />
      </div>
    </main>
  );
}

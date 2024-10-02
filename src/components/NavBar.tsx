import Logo from "@/icons/Logo";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import SearchInput from "./SearchInput";
import Tabs from "./Tabs";
import TempSelect from "./TempSelect";
import { useQuery } from "@tanstack/react-query";
import { fetchLocation } from "@/api/acccuweather";

export default function NavBar() {
  const { pathname } = useLocation();
  const { cityId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["location", cityId],
    queryFn: () => fetchLocation(cityId),
  });

  if (!isLoading && !data) return <Navigate to="/" />;

  return (
    <header className="sticky top-0 z-10 bg-cyan-800">
      <nav className="w-full border-b border-white border-opacity-55 p-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/">
              <Logo />
            </Link>
            {!isLoading && (
              <span>
                {data?.parentCity}, {data?.city}
              </span>
            )}
          </div>
          {pathname !== "/" && <SearchInput />}
          <TempSelect />
        </div>
      </nav>
      <div className="flex w-full justify-center bg-gray-800">
        {pathname !== "/" && <Tabs />}
      </div>
    </header>
  );
}

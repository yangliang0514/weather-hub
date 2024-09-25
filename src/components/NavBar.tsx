import Logo from "@/icons/Logo";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "./SearchInput";
import Tabs from "./Tabs";

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <header>
      <nav className="sticky top-0 w-full border-b border-white border-opacity-55 p-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          {pathname !== "/" && <SearchInput />}
          <div>menu</div>
        </div>
      </nav>
      <div className="flex w-full justify-center bg-gray-800 bg-opacity-50">
        {pathname !== "/" && <Tabs />}
      </div>
    </header>
  );
}

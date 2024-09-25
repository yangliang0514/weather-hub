import clsx from "clsx";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Tabs() {
  const { cityId } = useParams();
  const { pathname } = useLocation();
  const tabs = [
    { path: `/${cityId}/today`, text: "本日" },
    { path: `/${cityId}/hour`, text: "每小時" },
    { path: `/${cityId}/week`, text: "本週" },
  ];

  return (
    <div className="flex w-full max-w-7xl text-sm font-medium text-white">
      <ul className="flex justify-start gap-2">
        {tabs.map((tab) => (
          <li key={tab.path}>
            <Link
              to={tab.path}
              className={clsx(
                "inline-block rounded-t-lg border-b-2 p-4 hover:border-white",
                tab.path === pathname ? "border-white" : "border-transparent",
              )}
            >
              {tab.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";

export default function ErrorCard({
  className,
  queryKey,
}: {
  className?: string;
  queryKey?: string;
}) {
  const queryClient = useQueryClient();

  function handleRefetch() {
    if (!queryKey) return;
    queryClient.refetchQueries({ queryKey: [queryKey] });
  }

  return (
    <div
      className={cn(
        "flex min-h-64 items-center justify-center rounded-lg bg-white p-4 shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-1 text-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-10 fill-red-500"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clipRule="evenodd"
          />
        </svg>
        <p>發生錯誤，請稍後再試</p>{" "}
        <RefreshCcw
          className="ml-3 cursor-pointer hover:text-gray-500"
          onClick={handleRefetch}
        />
      </div>
    </div>
  );
}

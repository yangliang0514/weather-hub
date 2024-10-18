import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function LoadingCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("min-h-64 rounded-lg bg-white p-4 shadow-md", className)}
    >
      <div className="flex h-full w-full items-center justify-center">
        <LoaderCircle className="h-12 w-12 animate-spin" />
      </div>
    </div>
  );
}

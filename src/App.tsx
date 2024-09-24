import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000, retry: false } },
});
export default function App() {
  return (
    <main className="relative mx-auto min-h-screen bg-gradient-to-b from-cyan-800 to-gray-500 text-white">
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Outlet />
      </QueryClientProvider>
    </main>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppLayout from "./components/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000, retry: false } },
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <NavBar />
        <Outlet />
      </AppLayout>
    </QueryClientProvider>
  );
}

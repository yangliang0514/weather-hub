import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppLayout from "./components/AppLayout";
import ErrorBoundary from "./components/errors/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000, retry: false } },
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <NavBar />
        <ErrorBoundary fallback={<h1>Something went wrong...</h1>}>
          <Outlet />
        </ErrorBoundary>
      </AppLayout>
    </QueryClientProvider>
  );
}

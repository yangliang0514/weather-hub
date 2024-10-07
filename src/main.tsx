import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Today from "./pages/Today.tsx";
import Hourly from "./pages/Hourly.tsx";
import FiveDays from "./pages/FiveDays.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/:cityId/today", element: <Today /> },
      { path: "/:cityId/hour", element: <Hourly /> },
      { path: "/:cityId/five-days", element: <FiveDays /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

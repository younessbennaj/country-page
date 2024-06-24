import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FilterFn } from "@tanstack/react-table";
import Root from "./routes/root";
import Country, { loader as countryLoader } from "./routes/country";

declare module "@tanstack/react-table" {
  interface FilterFns {
    myCustomFilter: FilterFn<unknown>;
    independentFilter: FilterFn<unknown>;
    unMemberFilter: FilterFn<unknown>;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    loader: countryLoader,
    path: "countries/:countryId",
    element: <Country />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

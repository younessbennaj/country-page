import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Region } from "./types";

function useFilters() {
  const [sorting, setSorting] = useState<SortingState>([
    {
      desc: true,
      id: "population",
    },
  ]);

  const [regions, setRegions] = useState<Region[]>([]);

  const columnFilters = useMemo(
    () =>
      [
        {
          id: "region",
          value: regions,
        },
      ] as ColumnFiltersState,
    [regions]
  );

  return {
    columnFilters,
    sorting,
    regions,
    setRegions,
    setSorting,
  };
}

export default useFilters;

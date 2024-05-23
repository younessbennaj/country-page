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

  const [isIndependent, setIsIndependent] = useState(false);

  const [regions, setRegions] = useState<Region[]>([]);

  const columnFilters = useMemo(
    () =>
      [
        {
          id: "region",
          value: regions,
        },
        {
          id: "independent",
          value: isIndependent,
        },
      ] as ColumnFiltersState,
    [regions, isIndependent]
  );

  return {
    columnFilters,
    isIndependent,
    sorting,
    regions,
    setRegions,
    setSorting,
    setIsIndependent,
  };
}

export default useFilters;

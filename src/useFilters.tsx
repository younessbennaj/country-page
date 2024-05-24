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

  const [isUnMember, setIsUnMember] = useState(false);

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
        {
          id: "unMember",
          value: isUnMember,
        },
      ] as ColumnFiltersState,
    [regions, isIndependent, isUnMember]
  );

  return {
    columnFilters,
    isIndependent,
    isUnMember,
    sorting,
    regions,
    setIsUnMember,
    setRegions,
    setSorting,
    setIsIndependent,
  };
}

export default useFilters;

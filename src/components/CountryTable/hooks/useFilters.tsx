import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Region } from "../../../types";
import { useSessionStorage } from "@uidotdev/usehooks";

function useFilters() {
  const [sorting, setSorting] = useState<SortingState>(() => {
    const value = window.sessionStorage.getItem("sorting");
    if (value) {
      return JSON.parse(value) as SortingState;
    } else {
      return [
        {
          desc: true,
          id: "population",
        },
      ];
    }
  });

  const [isIndependent, setIsIndependent] = useSessionStorage(
    "is_independent",
    false
  );

  const [isUnMember, setIsUnMember] = useSessionStorage("is_unmember", false);

  const [regions, setRegions] = useState<Region[]>(() => {
    const value = window.sessionStorage.getItem("regions");
    if (value) {
      return JSON.parse(value) as Region[];
    } else {
      return [];
    }
  });

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

  useEffect(() => {
    window.sessionStorage.setItem("sorting", JSON.stringify(sorting));
    window.sessionStorage.setItem("regions", JSON.stringify(regions));
  }, [sorting, regions]);

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

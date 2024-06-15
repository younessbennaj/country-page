import {
  FilterFn,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useFilters from "./useFilters";
import { Country } from "../../../types";
import React from "react";

declare module "@tanstack/react-table" {
  interface FilterFns {
    myCustomFilter: FilterFn<unknown>;
    independentFilter: FilterFn<unknown>;
    unMemberFilter: FilterFn<unknown>;
  }
}

const columnHelper = createColumnHelper<Country>();

const columns = [
  columnHelper.accessor("flags.png", {
    cell: (info) => {
      return <img src={info.getValue()} />;
    },
    id: "flag",
    footer: (info) => info.column.id,
    header: () => <span>Flag</span>,
  }),
  columnHelper.accessor("name.common", {
    cell: (info) => info.getValue(),
    id: "name",
    footer: (info) => info.column.id,
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("population", {
    cell: (info) => info.getValue(),
    id: "population",
    footer: (info) => info.column.id,
    header: () => <span>Population</span>,
    enableGlobalFilter: false,
  }),
  columnHelper.accessor("area", {
    cell: (info) => info.getValue(),
    id: "area",
    footer: (info) => info.column.id,
    header: () => <span>Area (km²)</span>,
    enableGlobalFilter: false,
  }),
  columnHelper.accessor("region", {
    cell: (info) => info.getValue(),
    id: "region",
    filterFn: "myCustomFilter",
    footer: (info) => info.column.id,
    header: () => <span>Region</span>,
  }),
  // hidden columns for filtering purposes
  columnHelper.accessor("independent", {
    cell: (info) => {
      return info.getValue() ? "Yes" : "No";
    },
    id: "independent",
    filterFn: "independentFilter",
  }),
  columnHelper.accessor("unMember", {
    cell: (info) => {
      return info.getValue() ? "Yes" : "No";
    },
    id: "unMember",
    filterFn: "unMemberFilter",
  }),
  columnHelper.accessor("subregion", {
    cell: (info) => info.getValue(),
    id: "subregion",
  }),
];

export function useCountryTable(countries: Country[] | null) {
  const {
    columnFilters,
    sorting,
    regions,
    isIndependent,
    setRegions,
    setSorting,
    setIsIndependent,
    isUnMember,
    setIsUnMember,
  } = useFilters();

  const [filtering, setFiltering] = React.useState("");

  const table = useReactTable({
    data: countries || [],
    columns,
    filterFns: {
      myCustomFilter: (rows, _, filterValue) => {
        if (!filterValue.length) return true;
        if (filterValue.includes(rows.original.region.toLowerCase()))
          return true;
        return false;
      },
      independentFilter: (rows, _, filterValue) => {
        if (filterValue) {
          return rows.original.independent;
        }
        return true;
      },
      unMemberFilter: (rows, _, filterValue) => {
        if (filterValue) {
          return rows.original.unMember;
        }
        return true;
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      columnVisibility: {
        independent: false,
        unMember: false,
        subregion: false,
      },
    },
    state: {
      globalFilter: filtering,
      columnFilters,
      sorting,
    },
    onGlobalFilterChange: setFiltering,
  });

  return {
    table,
    regions,
    isIndependent,
    setRegions,
    setSorting,
    setIsIndependent,
    isUnMember,
    setIsUnMember,
    filtering,
    setFiltering,
  };
}

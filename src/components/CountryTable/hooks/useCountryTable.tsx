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

declare module "@tanstack/react-table" {
  interface FilterFns {
    myCustomFilter: FilterFn<unknown>;
    independentFilter: FilterFn<unknown>;
    unMemberFilter: FilterFn<unknown>;
  }
}

const columnHelper = createColumnHelper<Country>();

const columns = [
  columnHelper.accessor("flag", {
    cell: (info) => {
      return <img src={info.getValue()} />;
    },
    id: "flag",
    footer: (info) => info.column.id,
    header: () => <span>Flag</span>,
  }),
  columnHelper.accessor("name", {
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
  }),
  columnHelper.accessor("area", {
    cell: (info) => info.getValue(),
    id: "area",
    footer: (info) => info.column.id,
    header: () => <span>Area (km²)</span>,
  }),
  columnHelper.accessor("region", {
    cell: (info) => info.getValue(),
    id: "region",
    filterFn: "myCustomFilter",
    footer: (info) => info.column.id,
    header: () => <span>Region</span>,
  }),
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
      },
    },
    state: {
      columnFilters,
      sorting,
    },
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
  };
}

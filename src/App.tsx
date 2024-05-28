import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  FilterFn,
} from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Country, RestCountry } from "./types";
import useFilters from "./useFilters";
import RegionFilter from "./components/RegionFilter";
import SortSelect from "./components/SortSelect";
import Checkbox from "./components/Checkbox";

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

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

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
    data: countries,
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

  useEffect(() => {
    async function fetchCountries() {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      const countries = data.map((item: RestCountry) => {
        return {
          area: item.area,
          flag: item.flags.png,
          independent: item.independent,
          name: item.name.common,
          population: item.population,
          region: item.region,
          unMember: item.unMember,
        };
      });
      setCountries(countries);
    }

    fetchCountries();
  }, []);

  return (
    <div className="px-8 py-6">
      <div className="mb-9">
        <h2 className="subtitle">Found {table.getRowCount()} countries</h2>
      </div>

      <div className="filters mb-6">
        <div>
          <RegionFilter regions={regions} setRegions={setRegions} />
        </div>
        <div>
          <SortSelect setSorting={setSorting} />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xs text-light-grey font-semibold">Status</h3>
          <Checkbox
            checked={isUnMember}
            label="Member of the United Nations"
            onChange={setIsUnMember}
          />
          <Checkbox
            checked={isIndependent}
            label="Independent"
            onChange={setIsIndependent}
          />
        </div>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

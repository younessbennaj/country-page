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

declare module "@tanstack/react-table" {
  interface FilterFns {
    myCustomFilter: FilterFn<unknown>;
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
];

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  const { columnFilters, sorting, regions, setRegions, setSorting } =
    useFilters();

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
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
          name: item.name.common,
          population: item.population,
          region: item.region,
        };
      });
      setCountries(countries);
    }

    fetchCountries();
  }, []);

  return (
    <div>
      <div className="filters">
        <div>
          <RegionFilter regions={regions} setRegions={setRegions} />
        </div>
        <div
          style={{
            width: "50%",
          }}
        >
          <SortSelect setSorting={setSorting} />
        </div>
      </div>
      <h2 className="subtitle">Found {countries.length} countries</h2>
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

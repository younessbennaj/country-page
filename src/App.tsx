import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Country, SortBy } from "./types";
import Select from "./components/Select";

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
    footer: (info) => info.column.id,
    header: () => <span>Region</span>,
  }),
];

function App() {
  console.log("app rendered");

  const [countries, setCountries] = useState<Country[]>([]);

  const [sorting, setSorting] = useState<SortingState>([
    {
      desc: true,
      id: "population",
    },
  ]);

  const table = useReactTable({
    data: countries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as SortBy;
    const newSorting = [
      {
        desc: value === "name" ? false : true,
        id: value,
      },
    ];
    setSorting(newSorting);
  }

  useEffect(() => {
    async function fetchCountries() {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      const countries = data.map(
        (item: {
          area: number;
          flags: { png: string };
          name: { common: string };
          population: number;
          region: string;
        }) => {
          return {
            area: item.area,
            flag: item.flags.png,
            name: item.name.common,
            population: item.population,
            region: item.region,
          };
        }
      );
      setCountries(countries);
    }

    fetchCountries();
  }, []);

  return (
    <div>
      <div
        style={{
          width: "50%",
        }}
      >
        <Select onChange={handleSelectChange}>
          <option value="population">Population</option>
          <option value="name">Name</option>
          <option value="area">Area</option>
        </Select>
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

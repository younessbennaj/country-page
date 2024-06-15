import { flexRender } from "@tanstack/react-table";
import { Filters } from "../Filters/Filters";
import CountrySearchBar from "../CountrySearchBar/CountrySearchBar";
import { useCountryTable } from "./hooks/useCountryTable";
import { useCountriesQuery } from "../../queries/useCountriesQuery";
import { useNavigate } from "react-router-dom";

function CountryTable() {
  const { data: countries, isLoading } = useCountriesQuery();
  const navigate = useNavigate();

  const {
    isIndependent,
    isUnMember,
    regions,
    setIsIndependent,
    setIsUnMember,
    setRegions,
    setSorting,
    table,
    filtering,
    setFiltering,
  } = useCountryTable(countries);

  return (
    <>
      <div className="mb-9 flex items-center justify-between">
        <h2 className="subtitle">Found {table.getRowCount()} countries</h2>
        <CountrySearchBar
          query={filtering}
          onQueryChange={(query: string) => {
            setFiltering(query);
          }}
        />
      </div>

      <Filters
        isIndependent={isIndependent}
        isUnMember={isUnMember}
        regions={regions}
        setIsIndependent={setIsIndependent}
        setIsUnMember={setIsUnMember}
        setRegions={setRegions}
        setSorting={setSorting}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
              <tr
                className="cursor-pointer hover:bg-[#282B30]"
                key={row.id}
                onClick={() => {
                  navigate(`/countries/${row.original.ccn3}`);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default CountryTable;

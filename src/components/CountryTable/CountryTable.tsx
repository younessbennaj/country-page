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
        <h2 className="font-semibold text-base text-light-grey">
          Found {table.getRowCount()} countries
        </h2>
        <CountrySearchBar
          query={filtering}
          onQueryChange={(query: string) => {
            setFiltering(query);
          }}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="basis-[200px] lg:basis-[260px]">
          <Filters
            isIndependent={isIndependent}
            isUnMember={isUnMember}
            regions={regions}
            setIsIndependent={setIsIndependent}
            setIsUnMember={setIsUnMember}
            setRegions={setRegions}
            setSorting={setSorting}
          />
        </div>
        <div className="grow">
          {isLoading ? (
            <p>Loading...</p>
          ) : table.getRowCount() === 0 ? (
            <div className="flex justify-center">
              <p className="my-10 text-xl">No countries found</p>
            </div>
          ) : (
            <table>
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "15%" }} />
                <col
                  className="hidden xl:table-column"
                  style={{ width: "15%" }}
                />
              </colgroup>
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default CountryTable;

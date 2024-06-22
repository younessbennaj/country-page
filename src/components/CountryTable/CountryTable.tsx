import { flexRender } from "@tanstack/react-table";
import { Filters } from "../Filters/Filters";
import CountrySearchBar from "../CountrySearchBar/CountrySearchBar";
import { useCountryTable } from "./hooks/useCountryTable";
import { useCountriesQuery } from "../../queries/useCountriesQuery";
import React from "react";
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import CountryTableRow from "../CountryTableRow/CountryTableRow";
import { useLocation } from "react-router-dom";
import TableBodySkeleton from "../TableBodySkeleton/TableBodySkeleton";

let _kSavedOffset = 0;
let _kMeasurementsCache = [] as VirtualItem<Element>[];

function CountryTable() {
  const { data: countries, isLoading } = useCountriesQuery();

  const location = useLocation();

  let previouslyVisitedCountryPageId =
    location.state?.previouslyVisitedCountryPageId;

  const parentRef = React.useRef<HTMLDivElement>(null);

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
    sorting,
  } = useCountryTable(countries);

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    initialOffset: _kSavedOffset,
    initialMeasurementsCache: _kMeasurementsCache,
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 62,
    overscan: 10,
    onChange: (virtualizer) => {
      if (!virtualizer.isScrolling) {
        _kMeasurementsCache = virtualizer.measurementsCache;
        _kSavedOffset = virtualizer.scrollOffset || 0;
      }
    },
  });

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
            sorting={sorting}
          />
        </div>
        <div ref={parentRef} className="grow h-[600px] overflow-auto">
          <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
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
              {isLoading ? (
                <TableBodySkeleton />
              ) : table.getRowCount() === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={4}>
                      <div className="text-center m-6 w-full">
                        No countries found
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {virtualizer.getVirtualItems().map((virtualRow, index) => {
                    const row = table.getRowModel().rows[virtualRow.index];
                    return (
                      <CountryTableRow
                        key={row.id}
                        index={index}
                        isFocused={
                          previouslyVisitedCountryPageId === row.original.ccn3
                        }
                        row={row}
                        virtualRow={virtualRow}
                      />
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryTable;

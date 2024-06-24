import { flexRender } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { CountryTableRowProps } from "./types";
import { useEffect } from "react";
import React from "react";
import { useSessionStorage } from "@uidotdev/usehooks";

function CountryTableRow({ index, row, virtualRow }: CountryTableRowProps) {
  const navigate = useNavigate();
  const [previouslyVisitedCountryPageId, setPreviouslyVisitedCountryPageId] =
    useSessionStorage("previouslyVisitedCountryPageId", "");

  const rowRef = React.useRef<HTMLTableRowElement>(null);

  function goToCountryPage(countryId: string) {
    setPreviouslyVisitedCountryPageId(countryId);
    navigate(`/countries/${countryId}`);
  }

  function handleRowKeyPress(
    event: React.KeyboardEvent<HTMLTableRowElement>,
    countryId: string
  ) {
    if (event.key === "Enter" || event.key === " ") {
      goToCountryPage(countryId);
    }
  }

  function handleRowClick(countryId: string) {
    goToCountryPage(countryId);
  }

  // Keep a reference to the row element and focus it when it is focused
  useEffect(() => {
    if (previouslyVisitedCountryPageId === row.original.ccn3) {
      rowRef.current?.focus();
    }
  }, [previouslyVisitedCountryPageId]);

  return (
    <tr
      ref={rowRef}
      className="cursor-pointer hover:bg-[#282B30] focus-within:bg-[#282B30] focus-within:outline-none"
      onClick={() => handleRowClick(row.original.ccn3)}
      onKeyDown={(event) => handleRowKeyPress(event, row.original.ccn3)}
      style={{
        height: `${virtualRow.size}px`,
        transform: `translateY(${
          virtualRow.start - index * virtualRow.size
        }px)`,
      }}
      role="button"
      tabIndex={0}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}

export default CountryTableRow;

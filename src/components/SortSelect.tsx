import { SortingState } from "@tanstack/react-table";
import { SortBy } from "../types";
import Select from "./Select";

function SortSelect({
  sorting,
  setSorting,
}: {
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
}) {
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
  return (
    <Select onChange={handleSelectChange} value={sorting[0].id as SortBy}>
      <option value="population">Population</option>
      <option value="name">Name</option>
      <option value="area">Area</option>
    </Select>
  );
}

export default SortSelect;

import { SortingState } from "@tanstack/react-table";
import { Region } from "../../types";
import Checkbox from "../Checkbox";
import RegionFilter from "../RegionFilter";
import SortSelect from "../SortSelect";

export function Filters({
  isIndependent,
  isUnMember,
  regions,
  setIsIndependent,
  setIsUnMember,
  setRegions,
  setSorting,
}: {
  isIndependent: boolean;
  isUnMember: boolean;
  regions: Region[];
  setIsIndependent: (isIndependent: boolean) => void;
  setIsUnMember: (isUnMember: boolean) => void;
  setRegions: (regions: Region[]) => void;
  setSorting: (sorting: SortingState) => void;
}) {
  return (
    <div className="filters mb-6">
      <div>
        <SortSelect setSorting={setSorting} />
      </div>
      <div>
        <RegionFilter regions={regions} setRegions={setRegions} />
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
  );
}

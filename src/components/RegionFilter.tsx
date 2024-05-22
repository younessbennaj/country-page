import { Region } from "../types";
import CheckboxButton from "./CheckboxButton";

const checkboxOptions = [
  {
    id: "americas",
    label: "Americas",
    value: "americas",
  },
  {
    id: "antartics",
    label: "Antartics",
    value: "antartics",
  },
  {
    id: "africa",
    label: "Africa",
    value: "africa",
  },
  {
    id: "asia",
    label: "Asia",
    value: "asia",
  },
  {
    id: "europe",
    label: "Europe",
    value: "europe",
  },
  {
    id: "oceania",
    label: "Oceania",
    value: "oceania",
  },
];

function RegionFilter({
  regions,
  setRegions,
}: {
  regions: Region[];
  setRegions: (regions: Region[]) => void;
}) {
  return (
    <div role="group" aria-labelledby="region-heading">
      <h3 className="filter-label" id="region-heading">
        Region
      </h3>
      <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
        {checkboxOptions.map((option) => (
          <CheckboxButton
            key={option.id}
            label={option.label}
            id={option.id}
            name="region"
            onChange={(e) => {
              const value = e.target.value as Region;

              if (e.target.checked) {
                setRegions([...regions, value]);
              } else {
                setRegions(regions.filter((region) => region !== value));
              }
            }}
            value={option.value}
          />
        ))}
      </div>
    </div>
  );
}

export default RegionFilter;

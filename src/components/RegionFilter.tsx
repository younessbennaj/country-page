import { Field } from "@headlessui/react";
import { Region } from "../types";
import CheckboxButton from "./CheckboxButton";
import Label from "./Label";

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
    <Field role="group" aria-labelledby="region-heading">
      <Label className="mb-3" id="region-heading">
        Region
      </Label>
      <div className="flex flex-wrap gap-2">
        {checkboxOptions.map((option) => (
          <CheckboxButton
            checked={regions.includes(option.value as Region)}
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
    </Field>
  );
}

export default RegionFilter;

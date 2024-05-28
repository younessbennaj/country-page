import { ComponentPropsWithRef } from "react";
import { Select as SelectUI, Field } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Label from "./Label";

type SelectProps = ComponentPropsWithRef<"select"> & {
  children: React.ReactNode;
};

function Select({ children, ...delegation }: SelectProps) {
  return (
    <Field>
      <Label>Project status</Label>
      <div style={{ position: "relative" }}>
        <SelectUI {...delegation} className="select">
          {children}
        </SelectUI>
        <ChevronDownIcon className="icon" aria-hidden="true" />
      </div>
    </Field>
  );
}

export default Select;

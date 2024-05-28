import { Label as LabelUI } from "@headlessui/react";
import { ComponentProps } from "react";

type LabelProps = ComponentProps<"label"> & {
  children: React.ReactNode;
};

function Label({ children }: LabelProps) {
  return (
    <LabelUI className="text-xs text-light-grey font-semibold">
      {children}
    </LabelUI>
  );
}

export default Label;

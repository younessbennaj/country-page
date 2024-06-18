import { Label as LabelUI } from "@headlessui/react";
import { ComponentProps } from "react";

type LabelProps = ComponentProps<"label"> & {
  children: React.ReactNode;
};

function Label({ children, className = "" }: LabelProps) {
  return (
    <LabelUI
      className={
        "inline-block text-xs text-light-grey font-bold" + " " + className
      }
    >
      {children}
    </LabelUI>
  );
}

export default Label;

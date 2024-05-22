import { ComponentProps, useId } from "react";

type CheckboxButtonProps = ComponentProps<"input"> & {
  label: string;
};

function CheckboxButton({ label, ...delegation }: CheckboxButtonProps) {
  const id = useId();
  return (
    <div>
      <input
        {...delegation}
        className="checkbox"
        type="checkbox"
        id={delegation.id ?? id}
      />
      <label className="checkbox-label" htmlFor={delegation.id ?? id}>
        {label}
      </label>
    </div>
  );
}

export default CheckboxButton;

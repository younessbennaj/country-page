import { Checkbox as CheckboxUI, Field, Label } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";

function Checkbox({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <Field className="flex items-center gap-3">
      <CheckboxUI
        checked={checked}
        onChange={onChange}
        className="group size-6 rounded-md bg-transparent p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-blue-600 cursor-pointer flex items-center justify-center"
      >
        <CheckIcon className="hidden size-6 fill-white group-data-[checked]:block" />
      </CheckboxUI>
      <Label className="text-sm font-semibold">{label}</Label>
    </Field>
  );
}

export default Checkbox;

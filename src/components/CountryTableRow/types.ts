import { Row } from "@tanstack/react-table";
import { Country } from "../../types";
import { VirtualItem } from "@tanstack/react-virtual";

export type CountryTableRowProps = {
  row: Row<Country>;
  virtualRow: VirtualItem;
  index: number;
  isFocused: boolean;
};

import { FilterFn } from "@tanstack/react-table";
import CountryTable from "./components/CountryTable/CountryTable";
declare module "@tanstack/react-table" {
  interface FilterFns {
    myCustomFilter: FilterFn<unknown>;
    independentFilter: FilterFn<unknown>;
    unMemberFilter: FilterFn<unknown>;
  }
}

function App() {
  return (
    <div className="px-8 py-6">
      <CountryTable />
    </div>
  );
}

export default App;

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function CountrySearchBar({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <div className="p-2 bg-dark rounded-xl flex gap-3 has-[:focus]:outline has-[:focus]:outline-blue-400 pr-[50px] w-[340px]">
      <MagnifyingGlassIcon width={24} height={24} />
      <input
        className="bg-transparent focus-within:border-none focus-within:outline-none"
        type="text"
        name="search"
        id="search"
        placeholder="Search by Name, Region, Subregion"
        onChange={(e) => {
          if (/[a-z]/i.test(e.target.value) || e.target.value === "") {
            onQueryChange(e.target.value);
          }
        }}
        value={query}
        pattern="^[a-zA-Z\s]*$"
      />
    </div>
  );
}

export default CountrySearchBar;

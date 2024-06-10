import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function CountrySearchBar() {
  return (
    <form>
      <div className="p-2 bg-dark rounded-xl w-fit flex gap-3 has-[:focus]:outline has-[:focus]:outline-blue-400 pr-[50px]">
        <MagnifyingGlassIcon width={24} height={24} />
        <input
          className="bg-transparent focus-within:border-none focus-within:outline-none"
          type="text"
          name="search"
          id="search"
          placeholder="Search by Name, Region, Subregion"
          // onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
}

export default CountrySearchBar;

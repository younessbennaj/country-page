import CountryTable from "../components/CountryTable/CountryTable";

function Root() {
  return (
    <div className="px-6 bg-[#1E1E1E]">
      <div className="px-8 py-6 rounded-xl bg-custom-black shadow-2xl border border-dark mt-[240px]">
        <CountryTable />
      </div>
    </div>
  );
}

export default Root;

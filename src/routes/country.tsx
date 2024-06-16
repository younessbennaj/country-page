import { useLoaderData } from "react-router-dom";
import { useCountriesByCode } from "../queries/useCountryByCode";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
  const { countryId } = params as { countryId: string };
  return { countryId };
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Country() {
  const { countryId } = useLoaderData() as { countryId: string };
  const { data: countries, isLoading } = useCountriesByCode(countryId);

  const country = countries?.[0];

  console.log("country", country);

  const currencies = country
    ? Object.values(
        country.currencies as Record<string, { name: string; symbol: string }>
      ).map((currency: { name: string; symbol: string }) => currency.name)
    : [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const rowItems = [
    {
      label: "Capital",
      value: country.capital,
    },
    {
      label: "Subregion",
      value: country.subregion,
    },
    {
      label: "Languages",
      value: Object.values(country.languages).join(","),
    },
    {
      label: "Currencies",
      value: currencies.join(","),
    },
    {
      label: "Continents",
      value: country.continents.join(","),
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center pt-10 lg:max-w-[720px] my-0 mx-auto lg:rounded-xl lg:border lg:border-dark lg:shadow-2xl">
        <img
          className="object-cover w-auto h-[196px] rounded-xl mb-8"
          src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`}
          alt={`Flag of ${country.name.common}`}
        />
        <h2 className="text-[32px] text-blue-grey font-semibold">
          {country.name.common}
        </h2>
        <p className="text-base text-blue-grey mb-10">
          {country.name.official}
        </p>
        <div className="flex flex-col md:flex-row items-center gap-10 w-full justify-center mb-10">
          <div className="bg-dark py-2 px-5 rounded-xl divide-x divide-custom-black flex items-center">
            <span className="text-sm text-blue-grey inline-block py-3 pr-5">
              Population
            </span>
            <span className="text-base text-blue-grey inline-block py-3 pl-5">
              {numberWithCommas(Number(country.population))}
            </span>
          </div>
          <div className="bg-dark py-2 px-5 rounded-xl divide-x divide-custom-black flex items-center">
            <span className="text-sm text-blue-grey inline-block py-3 pr-5">
              Area (km<sup>2</sup>)
            </span>
            <span className="text-base text-blue-grey inline-block py-3 pl-5">
              {numberWithCommas(Number(country.area))}
            </span>
          </div>
        </div>
        <div className="w-full">
          {rowItems.map((item) => (
            <div
              key={item.label}
              className="flex justify-between p-5 border-b border-dark"
            >
              <span className="text-light-grey text-sm">{item.label}</span>
              <span className="text-blue-grey text-sm">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Country;
import { Link, useLoaderData } from "react-router-dom";
import { useCountriesByCode } from "../queries/useCountryByCode";
import Layout from "../components/Layout/Layout";
import { useBorderCountriesByCode } from "../queries/useCountriesQuery";
import { useEffect } from "react";

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

  const borders =
    countries && countries[0]?.borders ? countries[0]?.borders : [];

  const { data: borderCountries } = useBorderCountriesByCode(
    borders,
    countryId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [countryId]);

  const country = countries?.[0];

  const currencies = country
    ? Object.values(
        country.currencies as Record<string, { name: string; symbol: string }>
      ).map((currency: { name: string; symbol: string }) => currency.name)
    : [];

  const rowItems = [
    {
      label: "Capital",
      value: country ? country.capital : "",
    },
    {
      label: "Subregion",
      value: country ? country.subregion : "",
    },
    {
      label: "Languages",
      value: country ? Object.values(country.languages).join(",") : [],
    },
    {
      label: "Currencies",
      value: currencies.join(","),
    },
    {
      label: "Continents",
      value: country ? country.continents.join(",") : [],
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center pt-10 lg:max-w-[720px] my-0 mx-auto lg:rounded-xl lg:border lg:border-dark lg:shadow-2xl bg-custom-black">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-[196px] w-[260px] bg-gray-400 rounded mb-8"></div>
          </div>
        ) : (
          <img
            className="object-cover w-auto h-[196px] rounded-xl mb-8"
            src={`https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`}
            alt={`Flag of ${country.name.common}`}
          />
        )}
        {isLoading ? (
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-[32px] w-[80px] bg-gray-400 rounded mb-2"></div>
            <div className="h-[16px] w-[132px] bg-gray-400 rounded mb-10"></div>
          </div>
        ) : (
          <>
            <h2 className="text-[32px] text-blue-grey font-semibold">
              {country.name.common}
            </h2>
            <p className="text-base text-blue-grey mb-10">
              {country.name.official}
            </p>
          </>
        )}
        <div className="flex flex-col md:flex-row items-center gap-10 w-full justify-center mb-10">
          <div className="bg-dark py-2 px-5 rounded-xl divide-x divide-custom-black flex items-center">
            <span className="text-sm text-blue-grey inline-block py-3 pr-5">
              Population
            </span>
            <span className="text-base text-blue-grey inline-block py-3 pl-5">
              {isLoading ? (
                <div className="h-[16px] w-[132px] bg-gray-400 rounded"></div>
              ) : (
                numberWithCommas(Number(country.population))
              )}
            </span>
          </div>
          <div className="bg-dark py-2 px-5 rounded-xl divide-x divide-custom-black flex items-center">
            <span className="text-sm text-blue-grey inline-block py-3 pr-5">
              Area (km<sup>2</sup>)
            </span>
            <span className="text-base text-blue-grey inline-block py-3 pl-5">
              {isLoading ? (
                <div className="h-[16px] w-[132px] bg-gray-400 rounded"></div>
              ) : (
                numberWithCommas(Number(country.area))
              )}
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
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-2.5 w-[100px] bg-gray-400 rounded-xl"></div>
                </div>
              ) : (
                <span className="text-blue-grey text-sm">{item.value}</span>
              )}
            </div>
          ))}
        </div>
        {borderCountries && (
          <div className="w-full p-5">
            <span className="text-light-grey text-sm mb-4 block">
              Neighbouring Countries
            </span>
            <div className="flex gap-4 flex-wrap">
              {borderCountries?.map(
                ({
                  ccn3,
                  name: { common },
                  flags: { svg },
                }: {
                  ccn3: string;
                  name: { common: string };
                  flags: { svg: string };
                }) => (
                  <div key={ccn3}>
                    <Link
                      preventScrollReset={true}
                      to={`/countries/${ccn3}`}
                      replace={false}
                    >
                      <img
                        key={common}
                        className="w-[80px] h-[60px] object-cover"
                        src={svg}
                        alt={`Flag of ${common}`}
                      />
                    </Link>

                    <span className="text-blue-grey text-xs">{common}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Country;

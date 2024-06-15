import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
  const { countryId } = params as { countryId: string };
  return { countryId };
}

function Country() {
  const { countryId } = useLoaderData() as { countryId: string };

  return (
    <div>
      <h1>Country details</h1>
      <p>id: {countryId}</p>
    </div>
  );
}

export default Country;

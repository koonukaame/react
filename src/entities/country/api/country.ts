import { Country } from '../model';

type CountrySuccessResult = {
  country: Country;
  ok: true;
};

type CountryErrorResult = {
  message: string;
  ok: false;
};

type CountryResult = CountrySuccessResult | CountryErrorResult;

export const getCountries = async (): Promise<CountryResult> => {
  try {
    const response = await fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    );

    if (!response.ok) {
      return {
        message: `API failed with error ${response.status}: ${response.statusText}`,
        ok: false,
      };
    }

    const data = await response.json();
    const result = Country.safeParse(data);

    if (!result.success) {
      console.error('Validation errors:', result.error.issues);
      return {
        message: "Response data don't satisfies Country schema",
        ok: false,
      };
    }

    return { country: result.data, ok: true };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      ok: false,
    };
  }
};

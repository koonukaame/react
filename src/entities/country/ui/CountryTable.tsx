import { REQUIRED_COLUMNS, type Sort } from '@shared';
import type { Country } from '../model';
import { useEffect, useState } from 'react';

type Props = {
  data: Country;
  selectedColumns: string[];
  year: number | null;
  country: string;
  sort: Sort;
};

export const CountryTable = ({
  data,
  selectedColumns,
  year,
  country,
  sort,
}: Props) => {
  const renderColumns = [...REQUIRED_COLUMNS, ...selectedColumns];

  const countries = Object.entries(data)
    .filter(([countryName]) =>
      country ? countryName.toLowerCase().includes(country.toLowerCase()) : true
    )
    .sort(([aName, aData], [bName, bData]) => {
      const aYear = year
        ? aData.data.find((d) => d.year === year)
        : aData.data.at(-1);
      const bYear = year
        ? bData.data.find((d) => d.year === year)
        : bData.data.at(-1);

      switch (sort) {
        case 'country-asc':
          return aName.localeCompare(bName);
        case 'country-desc':
          return bName.localeCompare(aName);
        case 'population-asc':
          return (aYear?.population ?? 0) - (bYear?.population ?? 0);
        case 'population-desc':
          return (bYear?.population ?? 0) - (aYear?.population ?? 0);
      }
    });

  const [highlight, setHighlight] = useState(false);
  const [previousYear, setPreviousYear] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const representativeCountry = data['Australia'];
      const latest = representativeCountry?.data?.at(-1)?.year;
      setPreviousYear(latest ?? null);
      setIsInitialized(true);
    }
  }, [data, isInitialized]);

  useEffect(() => {
    if (
      isInitialized &&
      previousYear !== null &&
      year !== null &&
      year !== previousYear
    ) {
      setHighlight(true);

      const timeout = setTimeout(() => {
        setHighlight(false);
        setPreviousYear(year);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [year, previousYear, isInitialized]);

  return (
    <table className="border-separate">
      <thead>
        <tr>
          {renderColumns.map((column) => (
            <th className="p-3" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {countries.map(([countryName, { iso_code, data }]) => {
          const chosenYear =
            year !== null
              ? data.find((entry) => entry.year === year)
              : data.at(-1);

          const prevYear =
            previousYear !== null
              ? data.find((entry) => entry.year === previousYear)
              : null;

          const rowData = {
            country: countryName,
            iso_code,
            ...chosenYear,
          };

          return (
            <tr key={countryName}>
              {renderColumns.map((column) => {
                const currentValue = rowData[column as keyof typeof rowData];
                const prevValue = prevYear?.[column];

                const hasChanged =
                  highlight &&
                  column !== 'country' &&
                  column !== 'iso_code' &&
                  column !== 'year' &&
                  prevValue !== currentValue;

                return (
                  <td
                    className={`p-2 transition-colors duration-500 ${
                      hasChanged ? 'bg-green-200' : ''
                    }`}
                    key={`${countryName}-${column}`}
                  >
                    {currentValue ?? 'N/A'}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

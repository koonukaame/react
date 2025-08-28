import { REQUIRED_COLUMNS } from '@shared';
import type { Country } from '../model';

type Props = {
  data: Country;
  selectedColumns: string[];
  year: number | null;
  country: string;
};

export const CountryTable = ({
  data,
  selectedColumns,
  year,
  country,
}: Props) => {
  const renderColumns = [...REQUIRED_COLUMNS, ...selectedColumns];

  const countries = Object.entries(data).filter(([countryName]) =>
    country
      ? countryName.toLowerCase().includes(country.toLowerCase())
      : Object.entries(data)
  );

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
            year !== null ? data.find((d) => d.year === year) : data.at(-1);

          const rowData = {
            country: countryName,
            iso_code,
            ...chosenYear,
          };

          return (
            <tr key={countryName}>
              {renderColumns.map((column) => (
                <td className="p-2" key={`${countryName}-${column}`}>
                  {rowData[column as keyof typeof rowData] ?? 'N/A'}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

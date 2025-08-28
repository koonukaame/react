import { REQUIRED_COLUMNS } from '@shared';
import type { Country } from '../model';

type Props = {
  data: Country;
  selectedColumns: string[];
  year: number | null;
};

export const CountryTable = ({ data, selectedColumns, year }: Props) => {
  const renderColumns = [...REQUIRED_COLUMNS, ...selectedColumns];

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
        {Object.entries(data).map(([countryName, { iso_code, data }]) => {
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

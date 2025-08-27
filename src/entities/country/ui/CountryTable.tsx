import { REQUIRED_COLUMNS } from '@shared';
import type { Country } from '../model';

type Props = {
  data: Country;
  selectedColumns: string[];
};

export const CountryTable = ({ data, selectedColumns }: Props) => {
  const renderColumns = [...REQUIRED_COLUMNS, ...selectedColumns];

  return (
    <table>
      <thead>
        <tr>
          {renderColumns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([countryName, { iso_code, data }]) => {
          const latest = data.at(-1) ?? {};
          const rowData = {
            country: countryName,
            iso_code,
            ...latest,
          };

          return (
            <tr key={countryName}>
              {renderColumns.map((column) => (
                <td key={`${countryName}-${column}`}>
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

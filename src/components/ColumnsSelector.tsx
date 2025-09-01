import type { Country } from '@entities';
import { Button, REQUIRED_COLUMNS } from '@shared';
import { useCallback, useMemo, useState } from 'react';

type Props = {
  data: Country;
  onChange: (columns: string[]) => void;
  selectedColumns: string[];
};

export const ColumnsSelector = ({ data, onChange, selectedColumns }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const representativeCountry = data['Australia'];

  const latest = useMemo(
    () => representativeCountry.data.at(-1) ?? {},
    [representativeCountry]
  );

  const allColumns = useMemo(
    () =>
      Object.keys(latest).filter(
        (column) => !REQUIRED_COLUMNS.includes(column)
      ),
    [latest]
  );

  const handleChange = useCallback(
    (column: string) => {
      onChange(
        selectedColumns.includes(column)
          ? selectedColumns.filter((c) => c !== column)
          : [...selectedColumns, column]
      );
    },
    [onChange, selectedColumns]
  );

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>Select Columns</Button>
      {isOpen && (
        <div className="absolute text-sm flex flex-wrap gap-y-3 gap-x-5 w-[90vw] bg-white border border-gray-300 rounded p-4">
          {allColumns.map((column) => {
            return (
              <div key={column} className="flex items-center gap-2">
                <input
                  className="w-4 h-4 border-gray-300 rounded"
                  type="checkbox"
                  id={column}
                  checked={selectedColumns.includes(column)}
                  onChange={() => handleChange(column)}
                />
                <label
                  className="text-gray-700 uppercase text-2"
                  htmlFor={column}
                >
                  {column}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

import type { Country } from '@entities';
import { Button, REQUIRED_COLUMNS } from '@shared';
import { useState } from 'react';

type Props = {
  data: Country;
  onChange: (columns: string[]) => void;
  selectedColumns: string[];
};

export const ColumnsSelector = ({ data, onChange, selectedColumns }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const representativeCountry = data['Australia'];
  const latest = representativeCountry.data.at(-1) ?? {};
  const allColumns = Object.keys(latest).filter(
    (column) => !REQUIRED_COLUMNS.includes(column)
  );

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>Select Columns</Button>
      {isOpen && (
        <div className="absolute flex flex-col flex-wrap gap-y-3 gap-x-5 h-[80vh] bg-white border border-gray-300 rounded p-4">
          {allColumns.map((column) => {
            return (
              <div key={column} className="flex items-center gap-2">
                <input
                  className="w-4 h-4 border-gray-300 rounded"
                  type="checkbox"
                  id={column}
                  checked={selectedColumns.includes(column)}
                  onChange={() =>
                    onChange(
                      selectedColumns.includes(column)
                        ? selectedColumns.filter(
                            (selectedColumn) => selectedColumn !== column
                          )
                        : [...selectedColumns, column]
                    )
                  }
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

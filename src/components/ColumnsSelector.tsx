import type { Country } from '@entities';
import { REQUIRED_COLUMNS } from '@shared';
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
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        Select Columns
      </button>
      {isOpen && (
        <div className="absolute flex flex-col flex-wrap gap-1 h-[500px] bg-white border">
          {allColumns.map((column) => {
            return (
              <div key={column}>
                <input
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
                <label htmlFor={column}>{column}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

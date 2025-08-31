import {
  ColumnsSelector,
  CountryInput,
  SortSelect,
  YearInput,
} from '@components';
import { CountryTable, getCountries } from '@entities';
import type { Sort } from '@shared';
import { use, useState } from 'react';

const countriesPromise = getCountries();

export const Main = () => {
  const result = use(countriesPromise);

  if (!result.ok) {
    throw new Error(result.message);
  }

  const data = result.country;

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const [country, setCountry] = useState('');
  const [sort, setSort] = useState<Sort>('country-asc');

  return (
    <main className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="mb-4 flex flex-col gap-4">
        <ColumnsSelector
          data={data}
          selectedColumns={selectedColumns}
          onChange={setSelectedColumns}
        />
        <YearInput onClick={setYear} data={data} />
        <CountryInput onClick={setCountry} />
        <div>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <CountryTable
          data={data}
          selectedColumns={selectedColumns}
          year={year}
          country={country}
          sort={sort}
        />
      </div>
    </main>
  );
};

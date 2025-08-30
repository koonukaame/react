import {
  ColumnsSelector,
  CountryInput,
  SortSelect,
  YearInput,
} from '@components';
import { CountryTable, useGetCountriesQuery } from '@entities';
import type { Sort } from '@shared';
import { useState } from 'react';

export const Main = () => {
  const { data, isSuccess } = useGetCountriesQuery();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [year, setYear] = useState<number | null>(null);
  const [country, setCountry] = useState('');
  const [sort, setSort] = useState<Sort>('country-asc');

  return (
    isSuccess && (
      <main>
        <ColumnsSelector
          data={data}
          selectedColumns={selectedColumns}
          onChange={setSelectedColumns}
        />
        <YearInput onClick={setYear} data={data} />
        <CountryInput onClick={setCountry} />
        <SortSelect value={sort} onChange={setSort} />
        <CountryTable
          data={data}
          selectedColumns={selectedColumns}
          year={year}
          country={country}
          sort={sort}
        />
      </main>
    )
  );
};

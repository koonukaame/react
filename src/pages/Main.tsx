import { ColumnsSelector, YearInput } from '@components';
import { CountryTable, useGetCountriesQuery } from '@entities';
import { useState } from 'react';

export const Main = () => {
  const { data, isSuccess } = useGetCountriesQuery();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [year, setYear] = useState<number | null>(null);

  return (
    isSuccess && (
      <main>
        <ColumnsSelector
          data={data}
          selectedColumns={selectedColumns}
          onChange={setSelectedColumns}
        />
        <YearInput onClick={setYear} data={data} />
        <CountryTable
          data={data}
          selectedColumns={selectedColumns}
          year={year}
        />
      </main>
    )
  );
};

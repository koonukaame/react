import { ColumnsSelector } from '@components';
import { CountryTable, useGetCountriesQuery } from '@entities';
import { useState } from 'react';

export const Main = () => {
  const { data, isSuccess } = useGetCountriesQuery();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  return (
    isSuccess && (
      <main>
        <ColumnsSelector
          data={data}
          selectedColumns={selectedColumns}
          onChange={setSelectedColumns}
        />
        <CountryTable data={data} selectedColumns={selectedColumns} />
      </main>
    )
  );
};

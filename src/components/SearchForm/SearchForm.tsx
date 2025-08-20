'use client';

import { type ChangeEvent, type FormEvent } from 'react';
import { Button, SEARCH_KEY, useLocalStorage } from '@shared';
import { useTranslations } from 'next-intl';

type Props = {
  onSearch: (data: string) => void;
};

export const SearchForm = ({ onSearch }: Props) => {
  const [value, setValue] = useLocalStorage(SEARCH_KEY);
  const t = useTranslations('searchForm');

  const _onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedInput = value.trim();

    setValue(trimmedInput);
    onSearch(trimmedInput);
  };

  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <form
      onSubmit={_onSubmit}
      className="flex items-center justify-center gap-3"
    >
      <input
        value={value}
        onChange={_onChange}
        name="name"
        type="search"
        placeholder={t('placeholder')}
        className="flex-1 px-4 py-2 rounded-full border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 dark:focus:ring-stone-700 dark:text-stone-200 dark:border-stone-700 transition"
      />
      <Button type="submit">{t('button')}</Button>
    </form>
  );
};

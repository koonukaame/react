'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app';
import { unselectAll } from '@features';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export const Flyout = () => {
  const characters = useSelector((state: RootState) => state.select);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('flyout');

  const handleDownload = () => {
    const headers = Object.keys(characters[0] || {}).join(', ');

    const formattedData = characters
      .map((item) =>
        Object.values(item)
          .map((value) => (value === null ? 'Unknown' : value))
          .join(', ')
      )
      .join('\n');

    const csv = [headers, formattedData].join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv',
    });

    return URL.createObjectURL(blob);
  };

  if (characters.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed flex flex-col-reverse gap-3 left-6 bottom-6 rounded-xl p-3 bg-white dark:bg-neutral-900 border border-stone-200 dark:border-stone-700"
      data-testid="flyout"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-center items-center gap-2 cursor-pointer">
        <span className="text-stone-700 dark:text-stone-200 font-medium text-center">
          {`${characters.length} `}
          {characters.length === 1 ? t('single') : t('multiple')}
        </span>
        <span className="text-sm text-stone-700 dark:text-stone-200">
          {isOpen ? '▲' : '▼'}
        </span>
      </div>

      {isOpen && (
        <div className="flex gap-2 flex-col">
          <button
            onClick={() => dispatch(unselectAll())}
            className="bg-stone-100 text-stone-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-rose-200 transition cursor-pointer"
          >
            {t('unselect')}
          </button>
          <a
            href={handleDownload()}
            download={`${characters.length}_item${characters.length !== 1 ? 's' : ''}.csv`}
            data-testid="download-file"
            className="bg-rose-700/80 dark:bg-rose-300 hover:bg-rose-800 dark:hover:bg-rose-400 text-white dark:text-stone-800 text-sm font-semibold px-4 py-2 rounded-xl transition text-center"
          >
            {t('download')}
          </a>
        </div>
      )}
    </div>
  );
};

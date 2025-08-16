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

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characters),
      });

      if (!response.ok) {
        throw new Error('Failed to generate CSV');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${characters.length}_item${characters.length !== 1 ? 's' : ''}.csv`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  if (characters.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed flex flex-col-reverse gap-3 left-6 bottom-6 rounded-xl p-3 bg-white dark:bg-neutral-900 border border-stone-200 dark:border-stone-700"
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="bg-rose-700/80 dark:bg-rose-300 hover:bg-rose-800 dark:hover:bg-rose-400 text-white dark:text-stone-800 text-sm font-semibold px-4 py-2 rounded-xl transition text-center"
          >
            {t('download')}
          </button>
        </div>
      )}
    </div>
  );
};

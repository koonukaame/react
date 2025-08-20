'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app';
import { unselectAll } from '@features';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@i18n';

export const Flyout = () => {
  const characters = useSelector((state: RootState) => state.select);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('flyout');
  const [download, setDownload] = useState<string>();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(characters),
      });
      const csv = await response.text();
      setDownload(`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    })();
  }, [characters]);

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
          <Link
            href={download ?? '#'}
            download={`${characters.length}_item${characters.length !== 1 ? 's' : ''}.csv`}
            onClick={async (e) => {
              e.stopPropagation();
            }}
            className="bg-rose-700/80 dark:bg-rose-300 hover:bg-rose-800 dark:hover:bg-rose-400 text-white dark:text-stone-800 text-sm font-semibold px-4 py-2 rounded-xl transition text-center"
          >
            {t('download')}
          </Link>
        </div>
      )}
    </div>
  );
};

'use client';

import { useRouter, usePathname } from '@i18n';
import { useLocale } from 'next-intl';

const locales = [
  { value: 'en', label: 'en' },
  { value: 'ru', label: 'ru' },
];

export const LocaleSelect = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      value={locale}
      onChange={(e) => router.push(pathname, { locale: e.target.value })}
      className="rounded-md border border-stone-300 bg-white px-2 py-1 text-sm dark:bg-stone-800 dark:text-stone-200"
    >
      {locales.map((locale) => (
        <option key={locale.value} value={locale.value}>
          {locale.label}
        </option>
      ))}
    </select>
  );
};

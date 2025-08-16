import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('notFound');

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-9xl font-extrabold text-rose-700/80 dark:text-rose-400 mb-6 tracking-wide">
        404
      </h1>
      <span className="text-2xl font-semibold text-rose-900 dark:text-rose-300 mb-3">
        {t('text')}
      </span>
    </main>
  );
}

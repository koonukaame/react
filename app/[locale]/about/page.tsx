import { useTranslations } from 'next-intl';
import { Link } from '@i18n';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-9xl font-extrabold text-rose-700/80 dark:text-rose-400 mb-6 tracking-wide">
        {t('title')}
      </h1>
      <p className="mb-10 text-2xl text-rose-700/80 dark:text-rose-400 max-w-2xl leading-relaxed text-center">
        {t('text')}
        <Link
          className="font-semibold text-pink-700 dark:text-rose-300 underline underline-offset-2 hover:text-pink-900 transition-colors duration-200"
          href="https://github.com/koonukaame"
          target="_blank"
          rel="noreferrer"
        >
          koonukaame
        </Link>
      </p>
      <p className="absolute bottom-6 text-2xl text-rose-900 dark:text-rose-400 max-w-2xl leading-relaxed text-center">
        {t('footer')}
        <Link
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-pink-700 dark:text-rose-300 underline underline-offset-2 hover:text-pink-900 transition-colors duration-200"
        >
          Rolling Scopes School
        </Link>
      </p>
    </main>
  );
}

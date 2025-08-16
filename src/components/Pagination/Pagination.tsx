import { Button } from '@shared';
import { useTranslations } from 'next-intl';

type Props = {
  page: number;
  onChange: (page: number) => void;
  totalPages: number;
};

export const Pagination = ({ page, onChange, totalPages }: Props) => {
  const t = useTranslations('pagination');

  return (
    <div
      className="flex gap-2 items-center justify-center"
      data-testid="pagination"
    >
      <Button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        classNames={`disabled:bg-stone-400 dark:hover:disabled:bg-stone-400 disabled:cursor-not-allowed`}
        data-testid="previous-button"
      >
        {t('prev')}
      </Button>
      <span data-testid="page-count" className="dark:text-stone-200">
        {page} / {totalPages}
      </span>
      <Button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        classNames={'disabled:bg-gray-400 disabled:cursor-not-allowed'}
        data-testid="next-button"
      >
        {t('next')}
      </Button>
    </div>
  );
};

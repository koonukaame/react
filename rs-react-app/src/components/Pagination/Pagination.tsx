import { Button } from '../../shared';

type Props = {
  page: number;
  onChange: (page: number) => void;
  totalPages: number;
};

export const Pagination = ({ page, onChange, totalPages }: Props) => {
  return (
    <div
      className="flex gap-2 items-center justify-center"
      data-testid="pagination"
    >
      <Button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        classNames={`disabled:bg-gray-400 disabled:cursor-not-allowed`}
        data-testid="previous-button"
      >
        Prev
      </Button>
      <span data-testid="page-count">
        {page} / {totalPages}
      </span>
      <Button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        classNames={'disabled:bg-gray-400 disabled:cursor-not-allowed'}
        data-testid="next-button"
      >
        Next
      </Button>
    </div>
  );
};

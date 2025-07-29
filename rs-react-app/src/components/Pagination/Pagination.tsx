import type { Page } from '../../entities';
import { PAGE_OFFSET, SEARCH_KEY } from '../../shared';
import { Button } from '../../shared/ui-kit/Button';

type Props = {
  page: Page;
  onSearch: (formData: FormData, pageNum: number) => void;
};

export function Pagination({ page, onSearch }: Props) {
  function changePage(pageNum: number) {
    const searchTerm = localStorage.getItem(SEARCH_KEY) ?? '';
    const formData = new FormData();
    formData.set('name', searchTerm);

    onSearch(formData, pageNum);
  }

  return (
    <div
      className="flex gap-2 items-center justify-center"
      data-testid="pagination"
    >
      <Button
        onClick={() => changePage(page.pageNumber - PAGE_OFFSET)}
        disabled={page.firstPage}
        classNames={`disabled:bg-gray-400 disabled:cursor-not-allowed`}
        data-testid="previous-button"
      >
        Prev
      </Button>
      <span data-testid="page-count">
        {page.totalPages === 0
          ? page.pageNumber + PAGE_OFFSET
          : `${page.pageNumber + PAGE_OFFSET} / ${page.totalPages}`}
      </span>
      <Button
        onClick={() => changePage(page.pageNumber + PAGE_OFFSET)}
        disabled={page.lastPage}
        classNames={'disabled:bg-gray-400 disabled:cursor-not-allowed'}
        data-testid="next-button"
      >
        Next
      </Button>
    </div>
  );
}

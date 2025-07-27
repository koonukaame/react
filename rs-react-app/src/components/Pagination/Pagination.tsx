import type { Page } from '../../entities';
import { PAGE_OFFSET, SEARCH_KEY } from '../../shared';
import { BTN_STYLES } from '../../shared';

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
      <button
        onClick={() => changePage(page.pageNumber - PAGE_OFFSET)}
        disabled={page.firstPage}
        className={`${BTN_STYLES} disabled:bg-gray-400 disabled:cursor-not-allowed`}
        data-testid="previous-button"
      >
        Prev
      </button>
      <span data-testid="page-count">
        {page.totalPages === 0
          ? page.pageNumber + PAGE_OFFSET
          : `${page.pageNumber + PAGE_OFFSET} / ${page.totalPages}`}
      </span>
      <button
        onClick={() => changePage(page.pageNumber + PAGE_OFFSET)}
        disabled={page.lastPage}
        className={`${BTN_STYLES} disabled:bg-gray-400 disabled:cursor-not-allowed`}
        data-testid="next-button"
      >
        Next
      </button>
    </div>
  );
}

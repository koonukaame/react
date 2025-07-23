import type { Page } from '../../entities';
import { SEARCH_KEY } from '../../shared';
import { BTN_STYLES } from '../../shared/constants';

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
        onClick={() => changePage(page.pageNumber - 1)}
        disabled={page.firstPage}
        className={`${BTN_STYLES} disabled:bg-gray-400 disabled:cursor-not-allowed`}
        data-testid="previous-button"
      >
        Prev
      </button>
      <span>
        {page.totalPages === 0
          ? page.pageNumber + 1
          : `${page.pageNumber + 1} / ${page.totalPages}`}
      </span>
      <button
        onClick={() => changePage(page.pageNumber + 1)}
        disabled={page.lastPage}
        className={`${BTN_STYLES} disabled:bg-gray-400 disabled:cursor-not-allowed`}
        data-testid="next-button"
      >
        Next
      </button>
    </div>
  );
}

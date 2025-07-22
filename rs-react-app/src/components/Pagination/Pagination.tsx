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
    <div className="flex gap-2 items-center justify-center">
      <button
        onClick={() => changePage(page.pageNumber - 1)}
        disabled={page.firstPage}
        className={`${BTN_STYLES} disabled:bg-gray-400 disabled:hover:bg-gray-500 disabled:cursor-not-allowed`}
      >
        Prev
      </button>
      <span>
        {page.pageNumber + 1} / {page.totalPages}
      </span>
      <button
        onClick={() => changePage(page.pageNumber + 1)}
        disabled={page.lastPage}
        className={`${BTN_STYLES} disabled:bg-gray-400 disabled:hover:bg-gray-500 disabled:cursor-not-allowed`}
      >
        Next
      </button>
    </div>
  );
}

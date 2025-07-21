import { useState, type ChangeEvent, type FormEvent } from 'react';

type Props = {
  onSearch: (data: FormData) => void;
};

const searchKey = 'search';

export function SearchForm({ onSearch }: Props) {
  const [input, setInput] = useState<string>(() => {
    return localStorage.getItem(searchKey) ?? '';
  });

  function _onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedInput = input.trim();

    localStorage.setItem(searchKey, trimmedInput);
    setInput(trimmedInput);

    const formData = new FormData();
    formData.set('name', trimmedInput);

    onSearch(formData);
  }

  function _onChange(e: ChangeEvent<HTMLInputElement>) {
    localStorage.setItem(searchKey, e.target.value);

    setInput(e.target.value);
  }

  return (
    <form
      onSubmit={_onSubmit}
      className="flex items-center justify-center gap-3"
      data-testid="search-form"
    >
      <input
        value={input}
        onChange={_onChange}
        name="name"
        type="search"
        placeholder="Who are you looking for?"
        data-testid="search-input"
        className="flex-1 px-4 py-2 rounded-full border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
      />
      <button
        type="submit"
        data-testid="search-button"
        className="bg-rose-400 hover:bg-rose-500 text-white font-medium px-6 py-2 rounded-full shadow transition"
      >
        Search
      </button>
    </form>
  );
}

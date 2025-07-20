import { useState } from 'react';

export function ErrorBtn() {
  const [hasError, setError] = useState<boolean>(false);

  function handleClick() {
    setError(true);
  }

  if (hasError) {
    throw new Error('test');
  }

  return (
    <button
      className="bg-rose-400 hover:bg-rose-500 text-white font-medium px-6 py-2 mt-2 rounded-full shadow transition"
      onClick={handleClick}
      data-testid="error-button"
    >
      Show error
    </button>
  );
}

import { useState } from 'react';
import { BTN_STYLES } from '../../shared/constants';

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
      className={BTN_STYLES}
      onClick={handleClick}
      data-testid="error-button"
    >
      Show error
    </button>
  );
}

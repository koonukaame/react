'use client';

import { useEffect, useState } from 'react';

type useLocalStorageReturn = [string, (newValue: string) => void];

export const useLocalStorage = (key: string): useLocalStorageReturn => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      setValue(value);
    }
  }, [key]);

  function updateValue(newValue: string) {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  }

  return [value, updateValue];
};

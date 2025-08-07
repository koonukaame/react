import { useState } from 'react';

type useLocalStorageReturn = [string, (newValue: string) => void];

export const useLocalStorage = (key: string): useLocalStorageReturn => {
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem(key) ?? '';
  });

  function updateValue(newValue: string) {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  }

  return [value, updateValue];
};

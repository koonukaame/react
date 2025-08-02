import { createContext } from 'react';

type ThemeContextProps = {
  theme: 'dark' | null;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);

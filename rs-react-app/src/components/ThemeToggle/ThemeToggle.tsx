import { useTheme } from '@app';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-stone-800 dark:text-stone-200">Light</span>

      <button
        onClick={toggleTheme}
        className={`flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
          theme === 'dark' ? 'bg-gray-600 dark:bg-rose-300' : 'bg-gray-300'
        }`}
      >
        <span
          className={`h-4 w-4 transform rounded-full bg-white transition ${
            theme === 'dark' ? 'translate-x-5' : 'translate-x-2'
          }`}
        />
      </button>

      <span className="text-stone-800 dark:text-stone-200">Dark</span>
    </div>
  );
};

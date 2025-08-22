import { cn } from '../utils';

type Props = {
  text: string;
  onClick: () => void;
  isDanger?: boolean;
};

export const Button = ({ text, onClick, isDanger }: Props) => {
  return (
    <button
      className={cn(
        'py-3 rounded-lg text-xl min-w-[300px] text-indigo-50 cursor-pointer transition duration-200 mt-0',
        isDanger
          ? 'bg-red-500/40 hover:bg-red-500/50 active:bg-red-500/60'
          : 'bg-violet-500/40 hover:bg-violet-500/50 active:bg-violet-500/60'
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

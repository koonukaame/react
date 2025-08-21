type Props = {
  text: string;
  onClick: () => void;
};

export const Button = ({ text, onClick }: Props) => {
  return (
    <button
      className="bg-violet-500/40 py-3 rounded-lg text-xl min-w-[300px] text-indigo-50 cursor-pointer 
      transition duration-200 hover:bg-violet-500/50 hover:-translate-y-0.5 active:translate-y-0 active:bg-violet-500/60"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

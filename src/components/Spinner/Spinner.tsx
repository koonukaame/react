type Props = {
  isFullScreen: boolean;
};

export const Spinner = ({ isFullScreen }: Props) => {
  return (
    <div
      className={`${isFullScreen ? 'fixed inset-0' : 'absolute inset-0'} z-50 bg-black/10 flex justify-center items-center`}
      data-testid="spinner"
    >
      <div className="w-10 h-10 border-4 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
    </div>
  );
};

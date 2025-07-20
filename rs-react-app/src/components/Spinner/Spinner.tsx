export function Spinner() {
  return (
    <div
      className="fixed inset-0 bg-black/20 flex justify-center items-center"
      data-testid="spinner"
    >
      <div className="w-10 h-10 border-4 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
    </div>
  );
}

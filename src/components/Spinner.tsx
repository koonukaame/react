export const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
    </div>
  );
};

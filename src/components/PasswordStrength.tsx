type Props = {
  strength: 'none' | 'weak' | 'medium' | 'strong';
};

export const PasswordStrength = ({ strength }: Props) => {
  const getActiveBars = () =>
    strength === 'weak'
      ? 1
      : strength === 'medium'
        ? 2
        : strength === 'strong'
          ? 3
          : 0;

  return (
    <div className="flex gap-1 w-20">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`flex-1 h-2 rounded-full ${
            i < getActiveBars()
              ? strength === 'weak'
                ? 'bg-red-500'
                : strength === 'medium'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

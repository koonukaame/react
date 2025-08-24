import { calculatePasswordStrength } from '@shared';

type Props = {
  password: string;
};

export const PasswordStrength = ({ password }: Props) => {
  const strength = calculatePasswordStrength(password);

  const getActiveBars = () =>
    strength === 'weak'
      ? 1
      : strength === 'medium'
        ? 2
        : strength === 'strong'
          ? 3
          : 0;

  const getBarColor = (i: number) =>
    i < getActiveBars()
      ? strength === 'weak'
        ? 'bg-red-500'
        : strength === 'medium'
          ? 'bg-yellow-500'
          : 'bg-green-500'
      : 'bg-gray-300';

  return (
    <div className="flex gap-1 w-full">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`flex-1 h-2 rounded-full transition-colors duration-300 ${getBarColor(
            i
          )}`}
        />
      ))}
    </div>
  );
};

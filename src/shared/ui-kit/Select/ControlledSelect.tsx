import { useFormContext } from 'react-hook-form';
import { Select, type Props } from './Select';

type ControlledProps = Omit<Props, 'error'> & {
  registerName: string;
};

export const ControlledSelect = ({
  registerName,
  ...props
}: ControlledProps) => {
  const { register } = useFormContext();

  return <Select {...register(registerName)} {...props} />;
};

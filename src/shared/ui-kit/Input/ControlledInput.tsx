import { useFormContext } from 'react-hook-form';
import { Input, type Props } from './Input';

type ControlledProps = Props & {
  registerName: string;
};

export const ControlledInput = ({
  registerName,
  ...props
}: ControlledProps) => {
  const { register } = useFormContext();

  return <Input {...register(registerName)} {...props} />;
};

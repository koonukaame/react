import { useFormContext } from 'react-hook-form';
import { Datalist, type Props } from './Datalist';

type ControlledProps = Omit<Props, 'error'> & {
  registerName: string;
};

export const ControlledDatalist = ({
  registerName,
  ...props
}: ControlledProps) => {
  const { register } = useFormContext();

  return <Datalist {...register(registerName)} {...props} />;
};

import { addForm } from '@features';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  genderOptions,
  Button,
  formSchema,
  convertFileToBase64,
  useMainDispatch,
  calculatePasswordStrength,
  Input,
  Datalist,
  Select,
} from '@shared';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import type z from 'zod';

type Props = {
  onClose: () => void;
};

type FormFields = Omit<z.infer<typeof formSchema>, 'picture' | 'age'> & {
  picture: File | FileList;
  age: string | number;
};

export const ControlledForm = ({ onClose }: Props) => {
  const dispatch = useMainDispatch();

  const methods = useForm<FormFields>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { errors, isValid },
  } = methods;

  const passwordValue = methods.watch('password', '');
  const passwordStrength = calculatePasswordStrength(passwordValue);

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    let pictureBase64 = '';
    if (data.picture instanceof File) {
      pictureBase64 = await convertFileToBase64(data.picture);
    }

    const storeData = {
      name: data.name,
      age: Number(data.age),
      email: data.email,
      password: data.password,
      country: data.country,
      gender: data.gender,
      picture: pictureBase64,
      type: 'controlled' as const,
    };

    dispatch(addForm(storeData));
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form
        tabIndex={0}
        onSubmit={methods.handleSubmit(onSubmit)}
        className="p-3 text-white bg-neutral-900 flex flex-col gap-2 border border-neutral-700 rounded-md overflow-y-auto w-3xl"
        data-testid="controlled-form"
      >
        <div className="flex justify-between w-full gap-2">
          <Input
            registerName="name"
            type="text"
            id="name"
            label="Name"
            error={errors.name?.message}
            autoFocus={true}
            data-testid="controlled-name"
          />
          <Input
            registerName="age"
            type="number"
            id="age"
            label="Age"
            error={errors.age?.message}
            data-testid="controlled-age"
          />
        </div>
        <Input
          registerName="email"
          type="email"
          id="email"
          label="Email"
          error={errors.email?.message}
          data-testid="controlled-email"
        />
        <div className="flex justify-between w-full gap-2">
          <Input
            registerName="password"
            type="password"
            id="password"
            label="Password"
            passwordStrength={passwordStrength}
            error={errors.password?.message}
            data-testid="controlled-password"
          />
          <Input
            registerName="passwordRepeat"
            type="password"
            id="passwordRepeat"
            label="Repeat password"
            error={errors.passwordRepeat?.message}
            data-testid="controlled-password-repeat"
          />
        </div>

        <div className="flex justify-between w-full gap-2">
          <Datalist
            registerName="country"
            id="country"
            label="Country"
            error={errors.country?.message}
            data-testid="controlled-country"
          />
          <Select
            registerName="gender"
            id="gender"
            label="Gender"
            options={genderOptions}
            data-testid="controlled-gender"
          />
        </div>
        <Input
          registerName="picture"
          type="file"
          id="picture"
          accept=".png,.jpg,.jpeg"
          label="Add picture"
          error={errors.picture?.message}
          data-testid="controlled-picture"
        />
        <div className="flex items-start gap-2">
          <Input
            registerName="tos"
            type="checkbox"
            id="tos"
            label="I agree with terms and conditions"
            error={errors.tos?.message}
            data-testid="controlled-tos"
          />
        </div>

        <div className="flex justify-between">
          <Button text="Save" type="submit" disabled={!isValid} />
          <Button
            text="Close without saving"
            isDanger
            onClick={onClose}
            type="button"
          />
        </div>
      </form>
    </FormProvider>
  );
};

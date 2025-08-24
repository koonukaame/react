import { addForm } from '@features';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  genderOptions,
  Button,
  ControlledInput,
  ControlledDatalist,
  ControlledSelect,
  formSchema,
  convertFileToBase64,
  useMainDispatch,
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
        onSubmit={methods.handleSubmit(onSubmit)}
        className="p-3 text-white bg-neutral-900 flex flex-col gap-2 border border-neutral-700 rounded-md overflow-y-auto w-3xl"
      >
        <div className="flex justify-between w-full gap-2">
          <ControlledInput
            registerName="name"
            type="text"
            id="name"
            label="Name"
            error={errors.name?.message}
          />
          <ControlledInput
            registerName="age"
            type="number"
            id="age"
            label="Age"
            error={errors.age?.message}
          />
        </div>
        <ControlledInput
          registerName="email"
          type="email"
          id="email"
          label="Email"
          error={errors.email?.message}
        />
        <div className="flex justify-between w-full gap-2">
          <ControlledInput
            registerName="password"
            type="password"
            id="password"
            label="Password"
            password={passwordValue}
            error={errors.password?.message}
          />
          <ControlledInput
            registerName="passwordRepeat"
            type="password"
            id="passwordRepeat"
            label="Repeat password"
            error={errors.passwordRepeat?.message}
          />
        </div>

        <div className="flex justify-between w-full gap-2">
          <ControlledDatalist
            registerName="country"
            id="country"
            label="Country"
            error={errors.country?.message}
          />
          <ControlledSelect
            registerName="gender"
            id="gender"
            label="Gender"
            options={genderOptions}
          />
        </div>
        <ControlledInput
          registerName="picture"
          type="file"
          id="picture"
          accept=".png,.jpg,.jpeg"
          label="Add picture"
          error={errors.picture?.message}
        />
        <div className="flex items-start gap-2">
          <ControlledInput
            registerName="tos"
            type="checkbox"
            id="tos"
            label="I agree with terms and conditions"
            error={errors.tos?.message}
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

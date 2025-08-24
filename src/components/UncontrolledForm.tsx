import { useState, type FormEvent } from 'react';
import {
  Button,
  Datalist,
  formSchema,
  genderOptions,
  Input,
  Select,
  useMainDispatch,
} from '@shared';
import { addForm } from '@features';

type Props = {
  isControlled: boolean;
  onClose: () => void;
};

export const UncontrolledForm = ({ isControlled, onClose }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useMainDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const pictureFile = formData.get('picture');

    let pictureBase64 = '';
    if (pictureFile instanceof File) {
      pictureBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(pictureFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
      });
    }

    const data = {
      name: formData.get('name'),
      age: Number(formData.get('age')),
      email: formData.get('email'),
      password: formData.get('password'),
      passwordRepeat: formData.get('passwordRepeat'),
      picture: pictureFile,
      tos: formData.get('tos') === 'on',
    };

    const parsedFormData = formSchema.safeParse(data);

    if (!parsedFormData.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsedFormData.error.issues) {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      }
      setErrors(errors);
      return;
    }

    const storeData = {
      name: parsedFormData.data.name,
      age: parsedFormData.data.age,
      email: parsedFormData.data.email,
      password: parsedFormData.data.password,
      country: String(formData.get('country')),
      gender: String(formData.get('gender')),
      picture: pictureBase64,
      type: (isControlled ? 'controlled' : 'uncontrolled') as
        | 'controlled'
        | 'uncontrolled',
    };

    setErrors({});
    dispatch(addForm(storeData));
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 text-white bg-neutral-900 flex flex-col gap-2 border border-neutral-700 rounded-md overflow-y-auto w-3xl"
    >
      <div className="flex justify-between w-full gap-2">
        <Input type="text" id="name" label="Name" error={errors.name} />
        <Input type="number" id="age" label="Age" error={errors.age} />
      </div>
      <Input type="email" id="email" label="Email" error={errors.email} />
      <div className="flex justify-between w-full gap-2">
        <Input
          type="password"
          id="password"
          label="Password"
          error={errors.password}
        />
        <Input
          type="password"
          id="passwordRepeat"
          label="Repeat password"
          error={errors.passwordRepeat}
        />
      </div>

      <div className="flex justify-between w-full gap-2">
        <Datalist id="country" label="Country" />
        <Select id="gender" label="Gender" options={genderOptions} />
      </div>
      <Input
        type="file"
        id="picture"
        accept=".png,.jpg,.jpeg"
        label="Add picture"
        error={errors.picture}
      />
      <div className="flex items-start gap-2">
        <Input
          type="checkbox"
          id="tos"
          label="I agree with terms and conditions"
          error={errors.tos}
        />
      </div>

      <div className="flex justify-between">
        <Button text="Save" type="submit" />
        <Button
          text="Close without saving"
          isDanger
          onClick={onClose}
          type="button"
        />
      </div>
    </form>
  );
};

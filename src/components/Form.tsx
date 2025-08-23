import { useState, type FormEvent } from 'react';
import {
  Button,
  countryOptions,
  formSchema,
  genderOptions,
  Input,
  Select,
  useFormsDispatch,
} from '@shared';
import { addForm } from '@features';

type Props = {
  isControlled: boolean;
  onClose: () => void;
};

export const Form = ({ isControlled, onClose }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useFormsDispatch();

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
        <div className="w-full">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            isControlled={false}
            error={errors.name}
          />
        </div>
        <div className="w-full">
          <label htmlFor="age">Age</label>
          <Input
            type="number"
            id="age"
            name="age"
            isControlled={false}
            error={errors.age}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          isControlled={false}
          error={errors.email}
        />
      </div>
      <div className="flex justify-between w-full gap-2">
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            isControlled={false}
            error={errors.password}
          />
        </div>
        <div className="w-full">
          <label htmlFor="passwordRepeat">Repeat Password</label>
          <Input
            type="password"
            id="passwordRepeat"
            name="passwordRepeat"
            isControlled={false}
            error={errors.passwordRepeat}
          />
        </div>
      </div>

      <div className="flex justify-between w-full gap-2">
        <div className="w-full">
          <label htmlFor="country">Country</label>
          <Select name="country" id="country" options={countryOptions} />
        </div>
        <div className="w-full">
          <label htmlFor="gender">Gender</label>
          <Select id="gender" name="gender" options={genderOptions} />
        </div>
      </div>

      <div>
        <label htmlFor="picture">Add Picture</label>
        <Input
          type="file"
          id="picture"
          name="picture"
          accept=".png,.jpg,.jpeg"
          isControlled={false}
          error={errors.picture}
        />
      </div>
      <div className="flex items-start gap-2">
        <label htmlFor="tos">
          I agree with{' '}
          <span className="border-b-1 border-dashed border-violet-500/40 cursor-pointer">
            terms and conditions
          </span>
        </label>
        <Input
          type="checkbox"
          id="tos"
          name="tos"
          isControlled={false}
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

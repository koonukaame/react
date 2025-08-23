import { useState, type FormEvent } from 'react';
import {
  Button,
  countryOptions,
  formSchema,
  genderOptions,
  Input,
  Select,
} from '@shared';

type Props = {
  isControlled: boolean;
  onClose: () => void;
};

export const Form = ({ isControlled, onClose }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      age: Number(formData.get('age')),
      email: formData.get('email'),
      password: formData.get('password'),
      passwordRepeat: formData.get('passwordRepeat'),
      picture: formData.get('picture'),
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

    setErrors({});
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

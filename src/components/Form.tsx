import { useState } from 'react';
import { Button } from '@shared';
import { Input } from '@shared';

type Props = {
  isControlled: boolean;
  onClose: () => void;
};

export const Form = ({ isControlled, onClose }: Props) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');

  return (
    <form
      action=""
      className="p-10 text-white bg-neutral-900 flex flex-col gap-2 border border-neutral-700 rounded-md"
    >
      <div>
        <label htmlFor="name">Name</label>
        <Input
          type="text"
          placeholder="name"
          id="name"
          isControlled={isControlled}
          value={isControlled ? name : undefined}
          onChange={() => (isControlled ? setName : undefined)}
        />
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <Input
          type="number"
          placeholder="age"
          id="age"
          isControlled={isControlled}
          value={isControlled ? age : undefined}
          onChange={() => (isControlled ? setAge : undefined)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          placeholder="email"
          id="email"
          isControlled={isControlled}
          value={isControlled ? email : undefined}
          onChange={() => (isControlled ? setEmail : undefined)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          placeholder="password"
          id="password"
          isControlled={isControlled}
          value={isControlled ? password : undefined}
          onChange={() => (isControlled ? setPassword : undefined)}
        />
      </div>
      <div>
        <label htmlFor="repeat-password">Repeat password</label>
        <Input
          type="password"
          placeholder="repeat password"
          id="repeat-password"
          isControlled={isControlled}
          value={isControlled ? passwordRepeat : undefined}
          onChange={() => (isControlled ? setPasswordRepeat : undefined)}
        />
      </div>
      <div>
        <label htmlFor="label">Gender</label>
        <select id="gender">
          <option value="f">Female</option>
          <option value="m">Male</option>
          <option value="unknown">Prefer not to say</option>
        </select>
      </div>
      <div>
        <label htmlFor="picture">Upload picture</label>
        <Input
          id="picture"
          type="file"
          accept=".png,.jpg,.jpeg"
          isControlled={isControlled}
        />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select id="country">
          <option value="ru">Russia</option>
          <option value="by">Belarus</option>
          <option value="kz">Kazakhstan</option>
        </select>
      </div>
      <div>
        <Input
          type="checkbox"
          id="tos"
          name="tos"
          isControlled={isControlled}
        />
        <label htmlFor="tos">
          I agree with{' '}
          <span className="border-b-1 border-dashed border-violet-500/40">
            terms and conditions
          </span>
        </label>
      </div>
      <div className="flex justify-between gap-2">
        <Button text="Save" onClick={onClose}></Button>
        <Button text="Close without saving" isDanger onClick={onClose}></Button>
      </div>
    </form>
  );
};

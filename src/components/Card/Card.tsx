import { cn, genderOptions } from '@shared';
import { type FormData } from '@features';

type Props = {
  form: FormData;
  highlight?: boolean;
};

type CardField = keyof Pick<
  FormData,
  'name' | 'age' | 'email' | 'password' | 'country' | 'gender' | 'picture'
>;

type FieldsConfig = {
  key: CardField;
  text: string;
  transform?: (value: string) => string;
};

const fieldsConfig: FieldsConfig[] = [
  { key: 'name', text: 'Name' },
  { key: 'age', text: 'Age' },
  { key: 'email', text: 'Email' },
  {
    key: 'country',
    text: 'Country',
  },
  {
    key: 'gender',
    text: 'Gender',
    transform: (value: string) =>
      genderOptions.find((gender) => gender.value === value)?.text || value,
  },
  {
    key: 'password',
    text: 'Password',
  },
];

export const Card = ({ form, highlight }: Props) => {
  return (
    <div
      data-testid="card"
      className={cn(
        'w-[300px] border p-3 rounded-md transition-colors duration-300',
        highlight ? 'border-green-500' : 'border-neutral-700'
      )}
    >
      <div className="mb-2 text-sm text-neutral-400">Type: {form.type}</div>

      {form.picture && (
        <img
          src={form.picture}
          alt="Profile"
          data-testid="card-picture"
          className="w-32 h-32 object-cover rounded-md mb-2"
        />
      )}
      <ul className="space-y-1">
        {fieldsConfig.map(({ key, text, transform }) => (
          <li
            data-testid={`card-${key}`}
            key={key}
            className="flex justify-between items-center py-1 border-b border-neutral-700"
          >
            <span className="text-neutral-400">{text}:</span>
            <span className="text-neutral-200">
              {transform ? transform(String(form[key])) : form[key]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

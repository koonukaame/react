import { cn, countryOptions, genderOptions, useMainSelector } from '@shared';
import { type FormData } from '@features';
import { useState, useEffect } from 'react';

type Props = {
  type: 'controlled' | 'uncontrolled';
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
    transform: (value: string) =>
      countryOptions.find((country) => country.value === value)?.text || value,
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

export const Card = ({ type }: Props) => {
  const selector = useMainSelector((state) => state.forms);

  const sameTypeForms = selector.filter((form) => form.type === type);
  const form = sameTypeForms[sameTypeForms.length - 1];
  const prevForm = sameTypeForms[sameTypeForms.length - 2];

  const [newFields, setNewFields] = useState<(keyof FormData)[]>([]);

  useEffect(() => {
    if (form && prevForm) {
      const changed = fieldsConfig
        .map((item) => item.key)
        .filter((key) => form[key] !== prevForm[key]);

      if (form.picture !== prevForm.picture) {
        changed.push('picture');
      }

      setNewFields(changed);

      if (changed.length > 0) {
        const timer = setTimeout(() => setNewFields([]), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [form, prevForm]);

  const fieldClass = (field: CardField) =>
    cn(
      'text-white transition-all duration-300',
      newFields.includes(field) && 'text-green-500'
    );

  return form ? (
    <div className="w-full">
      <div>
        {form.picture && (
          <img
            src={form.picture}
            alt="Profile"
            className={cn(
              'w-32 h-32 object-cover rounded-md transition-all duration-300',
              newFields.includes('picture') && 'border-green-500'
            )}
          />
        )}
      </div>
      <ul className="space-y-2">
        {fieldsConfig.map(({ key, text, transform }) => (
          <li
            key={key}
            className="flex justify-between items-center py-2 border-b border-neutral-700"
          >
            <span className="text-neutral-400">{text}:</span>
            <span className={fieldClass(key)}>
              {transform ? transform(String(form[key])) : form[key]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="text-neutral-400 text-center p-4">
      Please fill the {type} form to see data
    </div>
  );
};

import z from 'zod';

export const countryOptions = [
  { value: 'gondor', text: 'Gondor' },
  { value: 'shire', text: 'Shire' },
  { value: 'mirkwood', text: 'Mirkwood' },
  { value: 'rohan', text: 'Rohan' },
];

export const genderOptions = [
  { value: 'f', text: 'Female' },
  { value: 'm', text: 'Male' },
];

const MAX_SIZE = 5;
const MB_TO_KB = 1024;
const KB_TO_B = 1024;
const MAX_SIZE_BYTES = MAX_SIZE * MB_TO_KB * KB_TO_B;

export const formSchema = z
  .object({
    name: z.string().regex(/^[A-Z]/, 'First letter must be uppercase'),
    age: z.number().min(1, 'Age must not be negative'),
    email: z.email('Please enter a valid email'),
    password: z
      .string()
      .regex(/[0-9]/, 'Password must contain at least 1 number')
      .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .regex(
        /[!-/:-@[-`{-~]/,
        'Password must contain at least 1 special character'
      ),
    passwordRepeat: z.string(),
    picture: z
      .instanceof(File)
      .refine((pic) => pic, 'Please upload picture')
      .refine(
        (pic) => ['image/png', 'image/jpeg', 'image/jpg'].includes(pic.type),
        'Picture must be of .png, .jpeg or .jpg extensions'
      )
      .refine(
        (pic) => pic.size <= MAX_SIZE_BYTES,
        `Size must be less than ${MAX_SIZE} MB`
      ),
    tos: z.boolean().refine((value) => value, 'You must accept ToS'),
  })
  .refine((schema) => schema.password === schema.passwordRepeat, {
    error: 'Enter matching password',
    path: ['passwordRepeat'],
  });

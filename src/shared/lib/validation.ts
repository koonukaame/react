import z from 'zod';

const MAX_SIZE = 5;
const MB_TO_KB = 1024;
const KB_TO_B = 1024;
const MAX_SIZE_BYTES = MAX_SIZE * MB_TO_KB * KB_TO_B;

export const formSchema = z
  .object({
    name: z.string().regex(/^[A-Z]/, 'First letter must be uppercase'),
    age: z
      .union([z.number(), z.string()])
      .transform((value) => Number(value))
      .refine(
        (value) => !isNaN(value) && value >= 1,
        'Age must be a valid number and not negative'
      ),
    email: z.email('Please enter a valid email'),
    password: z
      .string()
      .regex(/[0-9]/, 'Password must contain at least 1 number')
      .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
      .regex(
        /[!-/:-@[-`{-~]/,
        'Password must contain at least 1 special character'
      )
      .min(6, 'Password must be at least 6 characters long'),
    passwordRepeat: z.string(),
    country: z.string().min(1, 'Please select a country'),
    gender: z.string().min(1, 'Please select gender'),
    picture: z
      .union([
        z.instanceof(File),
        z
          .instanceof(FileList)
          .refine((fileList) => fileList.length > 0, 'Please upload picture')
          .transform((fileList) => fileList[0])
          .refine((file) => file instanceof File, 'Please upload picture'),
      ])
      .refine(
        (file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
        'Picture must be of .png, .jpeg or .jpg extensions'
      )
      .refine(
        (file) => file.size <= MAX_SIZE_BYTES,
        `Size must be less than ${MAX_SIZE} MB`
      ),
    tos: z.boolean().refine((value) => value, 'You must accept ToS'),
  })
  .refine((schema) => schema.password === schema.passwordRepeat, {
    error: 'Enter matching password',
    path: ['passwordRepeat'],
  });

import z from 'zod';

export const Country = z.record(
  z.string(),
  z.object({
    iso_code: z.string().optional(),
    data: z.array(
      z
        .object({
          year: z.number(),
          population: z.number().optional(),
          co2: z.number().optional(),
          co2_per_capita: z.number().optional(),
        })
        .catchall(z.number().optional())
    ),
  })
);

export type Country = z.infer<typeof Country>;

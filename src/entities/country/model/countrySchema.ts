import z from 'zod';

export const Country = z.record(
  z.string(),
  z.object({
    iso_code: z.string(),
    data: z.array(
      z
        .object({
          year: z.number(),
          population: z.number(),
          co2: z.number(),
          co2_per_capita: z.number(),
        })
        .catchall(z.number())
    ),
  })
);

export type Country = z.infer<typeof Country>;

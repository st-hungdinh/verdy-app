import z3 from 'zod';

export const ZAccount = z3.object({
  id: z3.string().uuid(),
  email: z3.string().email(),
  name: z3.string().min(2).max(100),
  age: z3.number().min(0).optional(),
});

export type TAccount = z3.infer<typeof ZAccount>;

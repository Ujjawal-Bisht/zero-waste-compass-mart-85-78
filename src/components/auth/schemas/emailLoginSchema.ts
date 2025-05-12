
import { z } from 'zod';

export const emailFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export type EmailFormValues = z.infer<typeof emailFormSchema>;

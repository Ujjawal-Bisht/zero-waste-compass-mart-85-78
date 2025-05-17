
import { z } from 'zod';

export const profileSchema = z.object({
  displayName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().optional(),
  dob: z.string().optional(),
  occupation: z.string().optional(),
  organization: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

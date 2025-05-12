
import { z } from 'zod';

export const itemFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Item name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  category: z.enum(['food', 'clothing', 'electronics', 'furniture', 'household', 'books', 'toys', 'other'] as const),
  expiryDate: z.date({
    required_error: 'Expiry date is required.',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  originalPrice: z.number().optional(),
  currentPrice: z.number().optional(),
  quantity: z.number().optional(),
});

export type ItemFormValues = z.infer<typeof itemFormSchema>;

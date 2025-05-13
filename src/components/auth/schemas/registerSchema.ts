
import { z } from 'zod';

// Base schema for common fields
export const baseUserSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  dob: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept terms and conditions',
  }),
});

// Schema with password validation for regular users
export const userSchema = baseUserSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Schema for sellers with additional fields
export const sellerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  businessName: z.string().min(2, { message: 'Business name is required' }),
  businessType: z.enum(['retailer', 'distributor', 'manufacturer', 'individual'], {
    required_error: 'Please select a business type',
  }),
  businessAddress: z.string().optional(),
  taxId: z.string().optional(),
  website: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept terms and conditions',
  }),
  isSeller: z.boolean().default(true),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

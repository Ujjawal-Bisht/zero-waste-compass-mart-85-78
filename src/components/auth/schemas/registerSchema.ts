
import { z } from 'zod';

// Base schema for common fields
export const baseUserSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),
  email: z.string()
    .email({ message: 'Please enter a valid email address' })
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(100, { message: 'Email cannot exceed 100 characters' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password cannot exceed 100 characters' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string(),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^\+?[0-9\s\-()]{7,20}$/.test(val), {
      message: 'Please enter a valid phone number',
    }),
  address: z.string().optional(),
  city: z.string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: 'City name must be at least 2 characters long',
    }),
  state: z.string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: 'State must be at least 2 characters long',
    }),
  zipCode: z.string()
    .optional()
    .refine((val) => !val || /^[0-9\s\-]{3,10}$/.test(val), {
      message: 'Please enter a valid postal/zip code',
    }),
  country: z.string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: 'Country must be at least 2 characters long',
    }),
  dob: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept terms and conditions to register',
  }),
});

// Schema with password validation for regular users
export const userSchema = baseUserSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Schema for sellers with additional fields
export const sellerSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name cannot exceed 50 characters' }),
  email: z.string()
    .email({ message: 'Please enter a valid email address' })
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(100, { message: 'Email cannot exceed 100 characters' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password cannot exceed 100 characters' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string(),
  phone: z.string()
    .min(7, { message: 'Phone number is required for seller accounts' })
    .refine((val) => /^\+?[0-9\s\-()]{7,20}$/.test(val), {
      message: 'Please enter a valid phone number',
    }),
  address: z.string().optional(),
  city: z.string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: 'City name must be at least 2 characters long',
    }),
  state: z.string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: 'State must be at least 2 characters long',
    }),
  zipCode: z.string()
    .optional()
    .refine((val) => !val || /^[0-9\s\-]{3,10}$/.test(val), {
      message: 'Please enter a valid postal/zip code',
    }),
  country: z.string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: 'Country must be at least 2 characters long',
    }),
  businessName: z.string()
    .min(2, { message: 'Business name must be at least 2 characters long' })
    .max(100, { message: 'Business name cannot exceed 100 characters' }),
  businessType: z.enum(['retailer', 'distributor', 'manufacturer', 'individual'], {
    required_error: 'Please select a business type',
  }),
  businessAddress: z.string()
    .min(5, { message: 'Business address is required and must be at least 5 characters' })
    .max(200, { message: 'Business address cannot exceed 200 characters' }),
  taxId: z.string()
    .optional()
    .refine((val) => !val || val.length >= 5, {
      message: 'Tax ID must be at least 5 characters long',
    }),
  website: z.string()
    .optional()
    .refine((val) => !val || /^(https?:\/\/)?(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}$/.test(val), {
      message: 'Please enter a valid website URL',
    }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept all terms to register as a seller',
  }),
  isSeller: z.boolean().default(true),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

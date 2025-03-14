// validationSchemas.js - Centralized validation schemas
import { z } from "zod";

// Email validation schema
export const emailSchema = z.object({
  email: z.string()
    .email("Invalid email address")
    .min(1, "Email is required"),
});

// Password validation schema
export const passwordSchema = z.object({
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .min(1, "Password is required"),
});

// Complete login form schema
export const loginFormSchema = emailSchema.merge(passwordSchema);

// You can extend this file with additional schemas for other forms
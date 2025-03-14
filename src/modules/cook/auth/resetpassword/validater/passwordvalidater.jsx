// PasswordValidator.js
import { z } from 'zod';

// Define the password validation schema
export const passwordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, 'Old password is required'),
  
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
}).refine(
  (data) => data.oldPassword !== data.newPassword,
  {
    message: "New password must be different from old password",
    path: ["newPassword"],
  }
);

// Hook for password validation
export const usePasswordValidator = () => {
  const validatePasswords = (oldPassword, newPassword) => {
    try {
      passwordSchema.parse({ oldPassword, newPassword });
      return { isValid: true, error: null };
    } catch (error) {
      // Extract the first error message from Zod's error format
      const errorMessage = error.errors?.[0]?.message || 'Invalid password';
      return { isValid: false, error: errorMessage };
    }
  };

  return { validatePasswords };
};
// EmailValidator.js
import { z } from 'zod';

// Define the validation schema
export const emailSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
});

// Component to handle validation
export const useEmailValidator = () => {
  const validateEmail = (email) => {
    try {
      // Validate the email using our schema
      emailSchema.parse({ email });
      return { isValid: true, error: null };
    } catch (error) {
      // Extract the error message from Zod's error format
      const errorMessage = error.errors?.[0]?.message || 'Invalid email';
      return { isValid: false, error: errorMessage };
    }
  };

  return { validateEmail };
};
import { z } from 'zod';


// Define the validation schema using Zod
export const useCookProfile = z.object({
  // Email validation
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .optional(),

  // Password validation
  currentPassword: z.string()
    .min(1, 'Current password is required to set a new password')
    .optional()
    .refine(val => {
      // Make it required only if newPassword is provided
      console.log(val);
      return true;
    }, {
      message: 'Current password is required to set a new password'
    }),

  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .optional(),

  confirmPassword: z.string().optional(),
  
  // Additional fields can be added as needed
  // Example:
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  cuisineSpecialties: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  qualifications: z.array(
    z.object({
      degree: z.string().min(1, 'Degree is required'),
      institution: z.string().min(1, 'Institution is required'),
      year: z.number().min(1, 'Year is required')
    })
  ).optional()
}).refine(data => {
  // Password confirmation check
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords must match",
  path: ["confirmPassword"]
}).refine(data => {
  // Require current password if new password is provided
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: "Current password is required to set a new password",
  path: ["currentPassword"]
});

// For use with createZodForm or similar utilities
// export const validateProfileUpdate = (values) => {
//   const result = profileUpdateSchema.safeParse(values);
//   if (!result.success) {
//     // Convert Zod errors to Formik-compatible format
//     const errors = {};
//     result.error.errors.forEach(err => {
//       errors[err.path[0]] = err.message;
//     });
//     return errors;
//   }
//   return {};
// };

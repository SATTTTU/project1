import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const adminResetPasswordSchema = z.object({
  
  // Current Password Field
  currentPassword: z.string().min(6, "Current password must be at least 6 characters"),

  // New Password Field
  newPassword: z.string().min(6, "Password must be at least 6 characters"),

  // Confirm Password Field
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
})
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });


export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});
import { z } from "zod";

// Common password validation pattern
const passwordRequirements = {
  min: 8,
  messages: {
    min: "Password must be at least 8 characters",
    uppercase: "Must include at least one uppercase letter",
    lowercase: "Must include at least one lowercase letter",
    number: "Must include at least one number",
    symbol: "Must include at least one special character"
  }
};

// Helper for creating consistent password schema
const createPasswordSchema = () => 
  z.string()
    .min(passwordRequirements.min, { message: passwordRequirements.messages.min })
    .regex(/[A-Z]/, { message: passwordRequirements.messages.uppercase })
    .regex(/[a-z]/, { message: passwordRequirements.messages.lowercase })
    .regex(/[0-9]/, { message: passwordRequirements.messages.number })
    .regex(/[@$!%*?&#^()[\]{}|;:,.<>\\~`_+=-]/, { message: passwordRequirements.messages.symbol });

export const loginSchema = z.object({ 
  email: z.string().email("Invalid email address").min(1, "Email is required"), 
  password: createPasswordSchema(),
});

export const signUpSchema = z.object({ 
  name: z.string().min(2, "Name must be at least 2 characters"), 
  email: z.string().email("Invalid email format"), 
  password: createPasswordSchema(),
});

export const forgotPasswordSchema = z.object({ 
  email: z
    .string("Email is required")
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
});

export const documentSchema = z.object({
	passwordsizedphoto: z
		.any()
		.refine((val) => val !== null, {
			message: "Passport-sized photo is required",
		})
		.refine(
			(val) =>
				val === null || (val instanceof File && val.size <= 5 * 1024 * 1024),
			{ message: "File must be less than 5MB" }
		),
	citizenshipFront: z
		.any()
		.refine((val) => val !== null, {
			message: "Citizenship front image is required",
		})
		.refine(
			(val) =>
				val === null || (val instanceof File && val.size <= 5 * 1024 * 1024),
			{ message: "File must be less than 5MB" }
		),
	citizenshipBack: z
		.any()
		.refine((val) => val !== null, {
			message: "Citizenship back image is required",
		})
		.refine(
			(val) =>
				val === null || (val instanceof File && val.size <= 5 * 1024 * 1024),
			{ message: "File must be less than 5MB" }
		),
	certificates: z
		.array(z.any())
		.optional()
		.refine(
			(val) =>
				!val ||
				val.every(
					(file) => file instanceof File && file.size <= 5 * 1024 * 1024
				),
			{ message: "All certificate files must be less than 5MB" }
		),
	experienceLetters: z.string().optional(),
});

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
      
    password: createPasswordSchema(),
      
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });

export const changePasswordSchema = z
  .object({ 
    oldpassword: z.string().min(8, "Current password is required"), 
    newpassword: createPasswordSchema(),
    confirmpassword: z.string(), 
  }) 
  .refine((data) => data.newpassword === data.confirmpassword, { 
    message: "Passwords do not match", 
    path: ["confirmpassword"], 
  }) 
  .refine((data) => data.oldpassword !== data.newpassword, { 
    message: "New password must be different from the current password", 
    path: ["newpassword"], 
  });
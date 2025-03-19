import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
	email: z
		.string("Email is required")
		.email("Please enter a valid email address.")
		.nonempty("Email is required."),
});

export const documentSchema = z.object({
	citizenshipFront: z
	  .instanceof(File)
	  .refine((file) => file?.type.startsWith("image/"), {
		message: "The file must be an image",
	  })
	  .refine((file) => file?.size <= 5 * 1024 * 1024, {
		message: "The file size must be less than 5MB",
	  })
	  .optional(),
	  
	citizenshipBack: z
	  .instanceof(File)
	  .refine((file) => file?.type.startsWith("image/"), {
		message: "The file must be an image",
	  })
	  .refine((file) => file?.size <= 5 * 1024 * 1024, {
		message: "The file size must be less than 5MB",
	  })
	  .optional(),
	  
	termsAccepted: z.boolean().refine((val) => val === true, {
	  message: "You must accept the terms and conditions",
	}),
});

// For when documents are required
export const requiredDocumentSchema = documentSchema.extend({
	citizenshipFront: z
	  .instanceof(File)
	  .refine((file) => file?.type.startsWith("image/"), {
		message: "The file must be an image",
	  })
	  .refine((file) => file?.size <= 5 * 1024 * 1024, {
		message: "The file size must be less than 5MB",
	  }),
	  
	citizenshipBack: z
	  .instanceof(File)
	  .refine((file) => file?.type.startsWith("image/"), {
		message: "The file must be an image",
	  })
	  .refine((file) => file?.size <= 5 * 1024 * 1024, {
		message: "The file size must be less than 5MB",
	  }),
});

export const resetPasswordSchema = z
   .object({
     email: z
       .string()
       .min(1, { message: "Email is required" })
       .email({ message: "Invalid email format" }),
     
     password: z
       .string()
       .min(8, { message: "Password must be at least 8 characters" })
       .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
       .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
       .regex(/[0-9]/, { message: "Must include at least one number" })
       .regex(/[@$!%*?&]/, { message: "Must include at least one special character" }),
     
     password_confirmation: z.string(),
   })
   .refine((data) => data.password === data.password_confirmation, {
     message: "Passwords must match",
     path: ["password_confirmation"],
   });

export const changePasswordSchema = z
	.object({
		oldpassword: z.string().min(8, "Current password is required"),
		newpassword: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Must contain at least one uppercase letter")
			.regex(/[0-9]/, "Must contain at least one number"),
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
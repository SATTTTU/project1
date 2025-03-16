import { z } from "zod";

export const signInSchema = z.object({
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



export const resetPasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .refine((val) => val !== z.input(resetPasswordSchema).oldPassword, {
        message: "New password must be different from old password",
      }),
  })
  // .required();

export const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(8, "Current password is required"),
		newPassword: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Must contain at least one uppercase letter")
			.regex(/[0-9]/, "Must contain at least one number"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: "New password must be different from the current password",
		path: ["newPassword"],
	});

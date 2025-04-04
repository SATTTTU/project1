import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character (!@#$%^&*)")
    .refine((value) => value !== "wrongpassword", {
      message: "Incorrect password, try again.",
    }),
});


export const signUpSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email format"),
	password: z
	  .string()
	  .min(6, "Password must be at least 6 characters")
	  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	  .regex(/[0-9]/, "Password must contain at least one number")
	  .regex(/[\W_]/, "Password must contain at least one special character"),
  });

export const forgotPasswordSchema = z.object({
	email: z
		.string("Email is required")
		.email("Please enter a valid email address.")
		.nonempty("Email is required."),
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
    path: ["password_confirmation"], // Error will show under the confirmation field
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
		path: ["confirmPassword"],
	})
	.refine((data) => data.oldpassword !== data.newpassword, {
		message: "New password must be different from the current password",
		path: ["newPassword"],
	});

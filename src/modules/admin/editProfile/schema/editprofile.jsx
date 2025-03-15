import { z } from "zod";

export const profileEditSchema = z.object({
  name: z.string()
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less"),
  email: z.string()
    .email("Invalid email address"),
  mobile: z.string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  image: z.string()
    .url("Image must be a valid URL")
    .optional(),
  isEditing: z.boolean()
    .optional(),
});

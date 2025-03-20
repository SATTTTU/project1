import { z } from "zod";

export const profileEditSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less"),
    
  email: z
    .string()
    .email("Invalid email format")
    .optional(),
    
  mobile: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    
  // Allow any type for image since it can be a File or a string URL
  image: z
    .any()
    .optional(),
    
  isEditing: z.boolean().optional(),
});
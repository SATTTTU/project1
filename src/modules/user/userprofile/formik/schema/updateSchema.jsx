
import { z } from "zod";

export const profileEditSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less"),
  
  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  
  // Actual file for submission
  image: z
    .any() // Use any() since File objects can't be fully validated by Zod
    .optional(), // Optional to allow cases when no image is uploaded
  
  // Image preview for UI only (not sent to API)
  imagePreview: z.string().optional(),
  
  isEditing: z.boolean().optional(),
});
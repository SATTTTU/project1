// schemas/cookprofileUpdateSchema.js
import {  z } from "zod";

export const cookprofileEditSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less"),
    
    
  // Actual file for submission
  image: z
    .any() // Use any() since File objects can't be fully validated by Zod
    .optional(), // Optional to allow cases when no image is uploaded
    
  email: z.string().email().optional(),
    
  // For UI state tracking
  isEditing: z.boolean().optional(),
});
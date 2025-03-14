import z from "zod";

export const profileEditSchema = z.object({
  name: z.string().min(1, "Full name is required").max(100, "Full name is too long"),
  email: z.string().email("Invalid email address"),
  
  // Make mobile truly optional - empty string or valid format
  mobile: z.union([
    z.string().length(0),
    z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits")
  ]).optional(),
  
  // Allow any string for image (base64 or URL)
  image: z.string().optional(),
  
  // Add isEditing field which was missing in your schema
  isEditing: z.boolean().optional(),
});
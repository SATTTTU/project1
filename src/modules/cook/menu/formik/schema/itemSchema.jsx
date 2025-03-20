import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .number()
    .min(0, "Price must be 0 or greater")
    .refine((val) => !isNaN(val), { message: "Price must be a valid number" }),
  description: z.string().min(1, "Description is required"),
  image: z
    .instanceof(File, { message: "Please upload a valid image file" })
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    })
    .refine((file) => !file || ["image/jpeg", "image/png"].includes(file.type), {
      message: "Only JPEG or PNG images are allowed",
    }),
  category_id: z.number().optional().nullable(),
});
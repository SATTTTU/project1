// schema/categorySchema.js
import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name cannot exceed 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description cannot exceed 200 characters"),
});

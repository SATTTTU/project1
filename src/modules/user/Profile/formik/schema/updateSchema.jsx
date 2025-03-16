import { object, string } from "zod";

export const profileSchema = object({
  name: string().min(2, "Name must be at least 2 characters"),
  email: string().email("Invalid email address"),
  phone: string().optional(),
  image_url: string().optional(),
});

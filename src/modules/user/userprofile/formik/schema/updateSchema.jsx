
import { z } from "zod";

export const profileEditSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  mobile: z.string().optional(),
  image: z.any().optional(),
});
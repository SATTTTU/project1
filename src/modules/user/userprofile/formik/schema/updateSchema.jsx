import { z } from "zod";

export const profileEditSchema = z.object({
	name: z.string().optional(),
	phone: z.string().optional(),
});

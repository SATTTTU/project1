import { z } from "zod";

export const withdrawEarningsSchema = z.object({
  amount: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format")
    .refine(value => parseFloat(value) > 0, { message: "Amount must be greater than 0" }),
  khalti_phone: z.string()
    .regex(/^98\d{8}$/, "Phone number must start with 98 and be 10 digits long")
});

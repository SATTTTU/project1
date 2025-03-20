import { z } from "zod";

export const VideoUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.type === "video/quicktime", {
      message: "Only .mov files are allowed",
    })
    .refine((file) => file.size <= 50 * 1024 * 1024, {
      // Assuming a max file size of 50MB (adjust as needed)
      message: "File size must be under 50MB",
    }),
  duration: z
    .number()
    .positive("Duration must be greater than 0")
    .max(60, "Video must be less than 1 minute"),
});



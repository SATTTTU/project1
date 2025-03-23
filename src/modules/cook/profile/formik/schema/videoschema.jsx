import { z } from "zod";

export const VideoUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => {
      // Allow multiple video formats
      const allowedTypes = ["video/mp4", "video/quicktime", "video/webm"];
      return allowedTypes.includes(file.type);
    }, {
      message: "Only MP4, MOV, or WebM files are allowed",
    })
    .refine((file) => file.size <= 50 * 1024 * 1024, {
      // 50MB max file size
      message: "File size must be under 50MB",
    }),
  duration: z
    .number()
    .positive("Duration must be greater than 0")
    .max(60, "Video must be less than 1 minute"),
});
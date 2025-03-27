import { z } from "zod";

export const videoSchema = z.object({
  video: z
    .any()
    .refine((file) => file instanceof File, {
      message: "A video file is required.",
    })
    .refine((file) => file && file.type.startsWith("video/"), {
      message: "Only video files are allowed.",
    })
    .refine((file) => file && file.size <= 50 * 1024 * 1024, {
      message: "Video must be less than 50MB.",
    })
    .superRefine((file, ctx) => {
      if (!file) return;

      return new Promise((resolve) => {
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = function () {
          window.URL.revokeObjectURL(video.src);
          if (video.duration > 120) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Video must be under 2 minutes.",
            });
          }
          resolve();
        };

        video.onerror = function () {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid video file.",
          });
          resolve();
        };

        video.src = URL.createObjectURL(file);
      });
    }),
});

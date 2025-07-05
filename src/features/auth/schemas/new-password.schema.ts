import { z } from "zod";

export const newPasswordSchema = z.object({
  password: z.string().min(8),
  passwordRepeat: z
    .string()
    .min(8)
    .refine(data => data === data, {
      message: "Passwords do not match",
    }),
});

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;

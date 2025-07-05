import { z } from "zod";

export const settingsSchema = z.object({
  displayName: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  isTwoFactorEnabled: z.boolean().optional(),
});

export type SettingsSchemaType = z.infer<typeof settingsSchema>;

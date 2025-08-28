import { z } from "zod";

// Schema for widget layout
export const WidgetLayoutSchema = z.object({
  i: z.string(),
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
  minW: z.number().optional(),
  minH: z.number().optional(),
  resizeHandles: z
    .array(z.enum(["n", "s", "e", "w", "ne", "nw", "se", "sw"]))
    .optional(),
});

// Schema for widget data (without component for serialization)
export const WidgetDataSchema = z.object({
  type: z.string(),
});

// Schema for widget data with component (for runtime)
export const WidgetDataWithComponentSchema = z.object({
  type: z.string(),
  component: z.any(), // React component
});

// Schema for dashboard state
export const DashboardStateSchema = z.object({
  widgets: z.record(z.string(), WidgetDataSchema),
  layouts: z.object({
    lg: z.array(WidgetLayoutSchema),
  }),
});

export type WidgetLayout = z.infer<typeof WidgetLayoutSchema>;
export type WidgetData = z.infer<typeof WidgetDataSchema>;
export type WidgetDataWithComponent = z.infer<
  typeof WidgetDataWithComponentSchema
>;
export type DashboardState = z.infer<typeof DashboardStateSchema>;

// Event color mapping to the new color scheme
export const eventColorMap: Record<string, string> = {
  sky: "#1D96F9",
  amber: "#FE8867",
  orange: "#FE8867",
  emerald: "#79E2C6",
  violet: "#6C5BF2",
  rose: "#EE8BF8",
  // Default colors for new events
  blue: "#1D96F9",
  purple: "#EE8BF8",
  green: "#79E2C6",
  cyan: "#3CD3FC",
};

// Get color for event
export function getEventDotColor(eventColor?: string): string {
  if (!eventColor) return eventColorMap.blue;
  return eventColorMap[eventColor.toLowerCase()] || eventColorMap.blue;
}

// Available colors for event creation
export const availableEventColors = [
  { name: "blue", value: "#1D96F9", label: "Синій" },
  { name: "purple", value: "#EE8BF8", label: "Фіолетовий" },
  { name: "green", value: "#79E2C6", label: "Зелений" },
  { name: "violet", value: "#6C5BF2", label: "Фіолетовий" },
  { name: "cyan", value: "#3CD3FC", label: "Блакитний" },
  { name: "orange", value: "#FE8867", label: "Помаранчевий" },
];

import { useMemo } from "react";

import { widgetComponents } from "@/features/dashboard/constants/widgets";

export const useWidgetComponents = (widgets: {
  [key: string]: { type: string };
}) => {
  return useMemo(() => {
    const widgetsWithComponents: {
      [key: string]: { type: string; component: any };
    } = {};

    console.log("Available widget types:", Object.keys(widgetComponents));
    console.log("Current widgets:", widgets);

    Object.entries(widgets).forEach(([widgetId, widgetData]) => {
      console.log(`Processing widget ${widgetId} with type ${widgetData.type}`);
      if (widgetData.type in widgetComponents) {
        const component = widgetComponents[widgetData.type].component;
        widgetsWithComponents[widgetId] = {
          type: widgetData.type,
          component,
        };
        console.log(`Successfully added widget ${widgetId}`);
      } else {
        console.log(`Widget type ${widgetData.type} not found in components`);
      }
    });

    console.log("Final widgets with components:", widgetsWithComponents);
    return widgetsWithComponents;
  }, [widgets]);
};

import { Layout } from "react-grid-layout";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  type DashboardState,
  DashboardStateSchema,
} from "./schemas/widget-schema";

// Create empty grid for initial state
const createEmptyGrid = () => {
  const emptyCells: Layout[] = [];

  // Create a grid that fills the entire available space (11 columns)
  const cellConfigs = [
    // Row 1
    { id: "empty_0_0", x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 1 },
    { id: "empty_0_1", x: 3, y: 0, w: 3, h: 2, minW: 2, minH: 1 },
    { id: "empty_0_2", x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 1 },
    { id: "empty_0_3", x: 9, y: 0, w: 2, h: 2, minW: 2, minH: 1 },

    // Row 2
    { id: "empty_1_0", x: 0, y: 2, w: 4, h: 2, minW: 2, minH: 1 },
    { id: "empty_1_1", x: 4, y: 2, w: 3, h: 2, minW: 2, minH: 1 },
    { id: "empty_1_2", x: 7, y: 2, w: 4, h: 2, minW: 2, minH: 1 },

    // Row 3
    { id: "empty_2_0", x: 0, y: 4, w: 3, h: 2, minW: 2, minH: 1 },
    { id: "empty_2_1", x: 3, y: 4, w: 5, h: 2, minW: 2, minH: 1 },
    { id: "empty_2_2", x: 8, y: 4, w: 3, h: 2, minW: 2, minH: 1 },

    // Row 4
    { id: "empty_3_0", x: 0, y: 6, w: 6, h: 2, minW: 2, minH: 1 },
    { id: "empty_3_1", x: 6, y: 6, w: 5, h: 2, minW: 2, minH: 1 },

    // Row 5
    { id: "empty_4_0", x: 0, y: 8, w: 3, h: 2, minW: 2, minH: 1 },
    { id: "empty_4_1", x: 3, y: 8, w: 3, h: 2, minW: 2, minH: 1 },
    { id: "empty_4_2", x: 6, y: 8, w: 3, h: 2, minW: 2, minH: 1 },
    { id: "empty_4_3", x: 9, y: 8, w: 2, h: 2, minW: 2, minH: 1 },
  ];

  cellConfigs.forEach(config => {
    emptyCells.push({
      i: config.id,
      x: config.x,
      y: config.y,
      w: config.w,
      h: config.h,
      minW: config.minW || 3,
      minH: config.minH || 1,
      resizeHandles: ["n", "s", "e", "w", "ne", "nw", "se", "sw"],
    });
  });

  return emptyCells;
};

interface DashboardStore extends DashboardState {
  // Actions
  addWidget: (
    widgetId: string,
    widgetData: { type: string; component: any }
  ) => void;
  updateLayout: (layouts: { lg: Layout[] }) => void;
  removeWidget: (widgetId: string) => void;
  resetDashboard: () => void;
}

// Default empty state
const defaultState: DashboardState = {
  widgets: {},
  layouts: {
    lg: createEmptyGrid(),
  },
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      ...defaultState,

      addWidget: (
        widgetId: string,
        widgetData: { type: string; component: any }
      ) => {
        set(state => ({
          widgets: {
            ...state.widgets,
            [widgetId]: { type: widgetData.type }, // Only save type for serialization
          },
        }));
      },

      updateLayout: (layouts: { lg: Layout[] }) => {
        set(state => ({
          layouts,
        }));
      },

      removeWidget: (widgetId: string) => {
        set(state => {
          const newWidgets = { ...state.widgets };
          delete newWidgets[widgetId];

          const newLayouts = {
            lg: state.layouts.lg.filter(layout => layout.i !== widgetId),
          };

          return {
            widgets: newWidgets,
            layouts: newLayouts,
          };
        });
      },

      resetDashboard: () => {
        set(defaultState);
      },
    }),
    {
      name: "dashboard-storage",
      // Validate data on load
      onRehydrateStorage: () => state => {
        if (state) {
          try {
            // Validate the stored data
            DashboardStateSchema.parse(state);
          } catch (error) {
            console.warn(
              "Invalid dashboard state found, resetting to default:",
              error
            );
            // Reset to default state if validation fails
            state.widgets = defaultState.widgets;
            state.layouts = defaultState.layouts;
          }
        }
      },
    }
  )
);

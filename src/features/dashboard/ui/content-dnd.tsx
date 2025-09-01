"use client";

import React, { useEffect, useState } from "react";

import { X } from "lucide-react";
import { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { widgetComponents } from "@/features/dashboard/constants/widgets";
import { useWidgetComponents } from "@/features/dashboard/hooks/use-widget-components";

import { useDashboardStore } from "@/shared/stores/dashboard-store";

import AddWidgetDialog from "./add-widget-dialog";
import EmptyCellButton from "./empty-cell-button";
import "./grid-styles.css";
import PageLayout from "./page-layout";

export default function DashboardContentDnd() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null);

  // Zustand store
  const { widgets, layouts, addWidget, updateLayout, removeWidget } =
    useDashboardStore();

  // Get widgets with components
  const widgetsWithComponents = useWidgetComponents(widgets);

  console.log("Widgets from store:", widgets);
  console.log("Widgets with components:", widgetsWithComponents);

  // Initialize empty grid if no layouts exist
  useEffect(() => {
    if (!layouts.lg || layouts.lg.length === 0) {
      console.log("No layouts found, using default empty grid");
    }
  }, [layouts.lg]);

  // Handle widget deletion
  const handleDeleteWidget = (widgetId: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот виджет?")) {
      return;
    }

    removeWidget(widgetId);

    // Replace widget with empty cell
    const removedLayout = layouts.lg.find(layout => layout.i === widgetId);
    if (removedLayout) {
      const emptyCellId = `empty_${Date.now()}`;
      const updatedLayouts = {
        lg: layouts.lg.map((layout: Layout) =>
          layout.i === widgetId
            ? ({
                i: emptyCellId,
                x: removedLayout.x,
                y: removedLayout.y,
                w: removedLayout.w,
                h: removedLayout.h,
                minW: removedLayout.w,
                minH: removedLayout.h,
                resizeHandles: ["n", "s", "e", "w", "ne", "nw", "se", "sw"],
              } as Layout)
            : layout
        ),
      };
      updateLayout(updatedLayouts);
    }
  };

  // Handle widget addition
  const handleAddWidget = (widgetType: string, cellId?: string) => {
    const widgetConfig = widgetComponents[widgetType];

    if (!widgetConfig) return;

    const { component: Component, defaultSize } = widgetConfig;

    if (cellId) {
      // Add widget to specific cell
      addWidget(cellId, { type: widgetType, component: Component });

      const updatedLayouts = {
        lg: layouts.lg.map((layout: Layout) =>
          layout.i === cellId
            ? ({
                ...layout,
                w: defaultSize.w,
                h: defaultSize.h,
                minW: defaultSize.w,
                minH: defaultSize.h,
                resizeHandles: ["n", "s", "e", "w", "ne", "nw", "se", "sw"],
              } as Layout)
            : layout
        ),
      };
      updateLayout(updatedLayouts);
    } else {
      // Add new widget at the end
      const widgetId = `widget_${Date.now()}`;
      addWidget(widgetId, { type: widgetType, component: Component });

      const newLayout = {
        lg: [
          ...layouts.lg,
          {
            i: widgetId,
            x: 0,
            y: Math.max(...layouts.lg.map((l: Layout) => l.y + l.h)) + 1,
            w: defaultSize.w,
            h: defaultSize.h,
            minW: defaultSize.w,
            minH: defaultSize.h,
            resizeHandles: ["n", "s", "e", "w", "ne", "nw", "se", "sw"],
          } as Layout,
        ],
      };
      updateLayout(newLayout as any);
    }
  };

  // Render widget with delete button
  const renderWidget = (layout: Layout, widget: any) => {
    const WidgetComponent = widget.component;
    return (
      <div key={layout.i} className="relative group">
        <button
          onMouseDown={() => handleDeleteWidget(layout.i)}
          className="absolute top-2 right-2 bg-[#495969] hover:bg-red-500 cursor-pointer rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
          title="Удалить виджет">
          <X className="w-4 h-4" color="white" />
        </button>
        <WidgetComponent />
      </div>
    );
  };

  // Render empty cell
  const renderEmptyCell = (layout: Layout) => {
    const handleCellClick = (cellId: string) => {
      setSelectedCellId(cellId);
      setIsDialogOpen(true);
    };

    return (
      <div
        onPointerDown={() => handleCellClick(layout.i)}
        key={layout.i}
        className="flex items-center cursor-pointer justify-center h-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
        <EmptyCellButton />
      </div>
    );
  };

  return (
    <div className="mt-6 w-full overflow-hidden">
      <PageLayout
        layouts={layouts}
        onLayoutChange={(currentLayout, allLayouts) => {
          updateLayout(allLayouts as any);
        }}>
        {layouts.lg.map(layout => {
          const widget = widgetsWithComponents[layout.i];

          if (widget && widget.component) {
            return renderWidget(layout, widget);
          } else {
            const isEmptyCell = layout.i.startsWith("empty_");
            if (isEmptyCell) {
              return renderEmptyCell(layout);
            } else {
              return <div key={layout.i} className="bg-gray-100" />;
            }
          }
        })}
      </PageLayout>

      <AddWidgetDialog
        isOpen={isDialogOpen}
        onClose={() => {
          console.log("Dialog closing"); // Для отладки
          setIsDialogOpen(false);
          setSelectedCellId(null);
        }}
        onAddWidget={widgetType => {
          console.log("Adding widget:", widgetType, "to cell:", selectedCellId); // Для отладки
          handleAddWidget(widgetType, selectedCellId || undefined);
        }}
      />
    </div>
  );
}

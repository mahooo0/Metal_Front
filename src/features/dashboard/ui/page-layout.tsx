"use client";

import React, { useState } from "react";

import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface PageLayoutProps {
  layouts?: { [key: string]: Layout[] };
  children: React.ReactNode;
  onLayoutChange?: (currentLayout: Layout[], allLayouts: Layouts) => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  layouts,
  children,
  onLayoutChange,
}) => {
  const [currentBreakPoints, setCurrentBreakPoints] = useState<string>("");

  const defaultProps = {
    className: "dev-helper",
    isDraggable: true,
    isResizable: true,
    breakpoints: { lg: 992 },
    cols: { lg: 11 },
    rowHeight: 100,
    margin: [24, 24] as [number, number],
    containerPadding: [24, 24] as [number, number],
    onBreakpointChange: setCurrentBreakPoints,
    layouts: layouts,
    onLayoutChange: onLayoutChange,
  };

  return (
    <ResponsiveGridLayout {...defaultProps}>{children}</ResponsiveGridLayout>
  );
};

export default PageLayout;

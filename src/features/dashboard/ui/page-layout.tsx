"use client";

import React, { useState } from "react";

import { Layout, Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface PageLayoutProps {
  layouts?: { [key: string]: Layout[] };
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ layouts, children }) => {
  const [currentBreakPoints, setCurrentBreakPoints] = useState<string>("");

  const defaultProps = {
    className: "dev-helper",
    isDraggable: true,
    isResizable: true,
    breakpoints: { xxl: 1600, xl: 1200, lg: 992, md: 768, sm: 576, xs: 480 },
    cols: { xxl: 12, xl: 10, lg: 8, md: 6, sm: 4, xs: 2 },
    rowHeight: 100,
    margin: [0, 0] as [number, number],
    containerPadding: [0, 0] as [number, number],
    onBreakpointChange: setCurrentBreakPoints,
    layouts: layouts,
  };

  const _currentCols =
    defaultProps.cols[currentBreakPoints as keyof typeof defaultProps.cols] ||
    "";

  return (
    <>
      <ResponsiveGridLayout {...defaultProps}>{children}</ResponsiveGridLayout>
    </>
  );
};

export default PageLayout;

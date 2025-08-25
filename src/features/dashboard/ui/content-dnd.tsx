"use client";

import React from "react";

import { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import "./grid-styles.css";
import PageLayout from "./page-layout";

const layouts: { [key: string]: Layout[] } = {
  xxl: [
    { i: "l1", x: 0, y: 0, w: 4, h: 4, resizeHandles: ["e"] },
    { i: "m1", x: 4, y: 0, w: 4, h: 3 },
    { i: "m2", x: 4, y: 5, w: 4, h: 3 },
    { i: "r1", x: 8, y: 0, w: 4, h: 5 },
    { i: "l2", x: 0, y: 8, w: 4, h: 5 },
    { i: "m3", x: 4, y: 9, w: 4, h: 3 },
    { i: "r2", x: 8, y: 8, w: 4, h: 2 },
    { i: "r3", x: 8, y: 0, w: 4, h: 2, static: true }, // static: true для фиксированного позиционирования
  ],
  xl: [
    { i: "l1", x: 0, y: 0, w: 3, h: 4, resizeHandles: ["e"] },
    { i: "m1", x: 3, y: 0, w: 4, h: 3 },
    { i: "m2", x: 3, y: 5, w: 4, h: 3 },
    { i: "r1", x: 8, y: 0, w: 3, h: 5 },
    { i: "l2", x: 0, y: 8, w: 3, h: 5 },
    { i: "m3", x: 3, y: 9, w: 4, h: 3 },
    { i: "r2", x: 8, y: 8, w: 3, h: 2 },
    { i: "r3", x: 8, y: 0, w: 3, h: 2 },
  ],
  lg: [
    { i: "l1", x: 0, y: 0, w: 3, h: 4, resizeHandles: ["e"] },
    { i: "m1", x: 3, y: 0, w: 2, h: 3 },
    { i: "m2", x: 3, y: 5, w: 2, h: 3 },
    { i: "r1", x: 8, y: 0, w: 3, h: 5 },
    { i: "l2", x: 0, y: 8, w: 3, h: 5 },
    { i: "m3", x: 3, y: 9, w: 2, h: 3 },
    { i: "r2", x: 8, y: 8, w: 3, h: 2 },
    { i: "r3", x: 8, y: 0, w: 3, h: 2 },
  ],
  md: [
    { i: "l1", x: 0, y: 0, w: 3, h: 4, resizeHandles: ["e"] },
    { i: "m1", x: 3, y: 0, w: 3, h: 3 },
    { i: "m2", x: 3, y: 3, w: 3, h: 3 },
    { i: "r1", x: 0, y: 8, w: 3, h: 4 },
    { i: "l2", x: 0, y: 8, w: 3, h: 5 },
    { i: "m3", x: 3, y: 5, w: 3, h: 3 },
    { i: "r2", x: 8, y: 8, w: 3, h: 2 },
    { i: "r3", x: 8, y: 0, w: 3, h: 2 },
  ],
  sm: [
    { i: "l1", x: 0, y: 0, w: 2, h: 3, resizeHandles: ["e"] },
    { i: "m1", x: 3, y: 0, w: 2, h: 2 },
    { i: "m2", x: 3, y: 0, w: 2, h: 2 },
    { i: "r1", x: 0, y: 0, w: 2, h: 3 },
    { i: "l2", x: 0, y: 0, w: 2, h: 4 },
    { i: "m3", x: 3, y: 0, w: 2, h: 2 },
    { i: "r2", x: 3, y: 0, w: 2, h: 2 },
    { i: "r3", x: 3, y: 0, w: 2, h: 2 },
  ],
  xs: [
    { i: "l1", x: 0, y: 0, w: 2, h: 3, resizeHandles: ["e"] },
    { i: "m1", x: 0, y: 0, w: 2, h: 2 },
    { i: "m2", x: 0, y: 0, w: 2, h: 2 },
    { i: "r1", x: 0, y: 0, w: 2, h: 3 },
    { i: "l2", x: 0, y: 0, w: 2, h: 4 },
    { i: "m3", x: 0, y: 0, w: 2, h: 2 },
    { i: "r2", x: 0, y: 0, w: 2, h: 2 },
    { i: "r3", x: 0, y: 0, w: 2, h: 2 },
  ],
};

export default function DashboardContentDnd() {
  return (
    <div className="mt-6 w-full overflow-hidden">
      <PageLayout layouts={layouts}>
        <div key="l1" className="bg-blue-100">
          Левая панель 1
        </div>
        <div key="m1" className="bg-green-100">
          Средняя панель 1
        </div>
        <div key="m2" className="bg-yellow-100">
          Средняя панель 2
        </div>
        <div key="r1" className="bg-red-100">
          Правая панель 1
        </div>
        <div key="l2" className="bg-purple-100">
          Левая панель 2
        </div>
        <div key="m3" className="bg-pink-100">
          Средняя панель 3
        </div>
        <div key="r2" className="bg-indigo-100">
          Правая панель 2
        </div>
        <div key="r3" className="bg-orange-100">
          Правая панель 3
        </div>
      </PageLayout>
    </div>
  );
}

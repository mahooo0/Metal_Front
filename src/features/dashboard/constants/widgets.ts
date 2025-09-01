import Widget1 from "@/features/dashboard/ui/widgets/2-1/widget1";
import Widget2 from "@/features/dashboard/ui/widgets/2-1/widget2";
import Widget3 from "@/features/dashboard/ui/widgets/2-1/widget3";
import Widget4 from "@/features/dashboard/ui/widgets/2-1/widget4";
import Widget5 from "@/features/dashboard/ui/widgets/2-1/widget5";
import Widget6 from "@/features/dashboard/ui/widgets/2-1/widget6";
import Widget7 from "@/features/dashboard/ui/widgets/2-2/widget7";
import Widget8 from "@/features/dashboard/ui/widgets/2-2/widget8";
import Widget9 from "@/features/dashboard/ui/widgets/2-2/widget9";
import Widget10 from "@/features/dashboard/ui/widgets/2-2/widget10";
import Widget11 from "@/features/dashboard/ui/widgets/2-3/widget11";
import Widget12 from "@/features/dashboard/ui/widgets/2-3/widget12";
import Widget13 from "@/features/dashboard/ui/widgets/2-3/widget13";
import Widget14 from "@/features/dashboard/ui/widgets/2-3/widget14";
import Widget15 from "@/features/dashboard/ui/widgets/2-3/widget15";
import Widget16 from "@/features/dashboard/ui/widgets/4-2/widget16";
import Widget17 from "@/features/dashboard/ui/widgets/4-2/widget17";
import Widget18 from "@/features/dashboard/ui/widgets/4-4/widget18";
import Widget19 from "@/features/dashboard/ui/widgets/4-4/widget19";
import Widget20 from "@/features/dashboard/ui/widgets/4-4/widget20";
import Widget21 from "@/features/dashboard/ui/widgets/6-4/widget21";

// Widget configuration with default sizes
export const widgetComponents: {
  [key: string]: {
    component: React.ComponentType;
    defaultSize: { w: number; h: number };
  };
} = {
  widget1: { component: Widget1, defaultSize: { w: 2, h: 1 } },
  widget2: { component: Widget2, defaultSize: { w: 2, h: 1 } },
  widget3: { component: Widget3, defaultSize: { w: 2, h: 1 } },
  widget4: { component: Widget4, defaultSize: { w: 2, h: 1 } },
  widget5: { component: Widget5, defaultSize: { w: 2, h: 1 } },
  widget6: { component: Widget6, defaultSize: { w: 2, h: 1 } },
  widget7: { component: Widget7, defaultSize: { w: 2, h: 2 } },
  widget8: { component: Widget8, defaultSize: { w: 2, h: 2 } },
  widget9: { component: Widget9, defaultSize: { w: 2, h: 2 } },
  widget10: { component: Widget10, defaultSize: { w: 2, h: 2 } },
  widget11: { component: Widget11, defaultSize: { w: 2, h: 4 } },
  widget12: { component: Widget12, defaultSize: { w: 2, h: 3 } },
  widget13: { component: Widget13, defaultSize: { w: 2, h: 3 } },
  widget14: { component: Widget14, defaultSize: { w: 2, h: 3 } },
  widget15: { component: Widget15, defaultSize: { w: 2, h: 3 } },
  widget16: { component: Widget16, defaultSize: { w: 4, h: 2 } },
  widget17: { component: Widget17, defaultSize: { w: 4, h: 2 } },
  widget18: { component: Widget18, defaultSize: { w: 4, h: 4 } },
  widget19: { component: Widget19, defaultSize: { w: 4, h: 4 } },
  widget20: { component: Widget20, defaultSize: { w: 4, h: 4 } },
  widget21: { component: Widget21, defaultSize: { w: 6, h: 4 } },
};

// Widget types for dialog
export const widgetTypes = [
  {
    id: "widget1",
    name: "Spending Overview",
    component: Widget1,
    defaultSize: { w: 3, h: 1 },
  },
  {
    id: "widget2",
    name: "Spending Chart",
    component: Widget2,
    defaultSize: { w: 3, h: 1 },
  },
  {
    id: "widget3",
    name: "Progress Widget",
    component: Widget3,
    defaultSize: { w: 3, h: 1 },
  },
  {
    id: "widget4",
    name: "Chart Icon Widget",
    component: Widget4,
    defaultSize: { w: 3, h: 1 },
  },
  {
    id: "widget5",
    name: "Users Widget",
    component: Widget5,
    defaultSize: { w: 3, h: 1 },
  },
  {
    id: "widget6",
    name: "Blue Widget",
    component: Widget6,
    defaultSize: { w: 3, h: 1 },
  },
  {
    id: "widget7",
    name: "Progress Analytics",
    component: Widget7,
    defaultSize: { w: 3, h: 2 },
  },
  {
    id: "widget8",
    name: "Revenue Overview",
    component: Widget8,
    defaultSize: { w: 3, h: 2 },
  },
  {
    id: "widget9",
    name: "User Analytics",
    component: Widget9,
    defaultSize: { w: 2, h: 2 },
  },
  {
    id: "widget10",
    name: "User Analytics",
    component: Widget10,
    defaultSize: { w: 2, h: 2 },
  },
  {
    id: "widget11",
    name: "Calendar",
    component: Widget11,
    defaultSize: { w: 2, h: 4 },
  },
  {
    id: "widget12",
    name: "Savings Chart",
    component: Widget12,
    defaultSize: { w: 2, h: 3 },
  },
  {
    id: "widget13",
    name: "Trend Chart",
    component: Widget13,
    defaultSize: { w: 2, h: 3 },
  },
  {
    id: "widget14",
    name: "Income Chart",
    component: Widget14,
    defaultSize: { w: 2, h: 3 },
  },
  {
    id: "widget15",
    name: "Credit Balance",
    component: Widget15,
    defaultSize: { w: 2, h: 3 },
  },
  {
    id: "widget16",
    name: "Donut Chart",
    component: Widget16,
    defaultSize: { w: 9, h: 2 },
  },
  {
    id: "widget17",
    name: "Latest Orders",
    component: Widget17,
    defaultSize: { w: 9, h: 2 },
  },
  {
    id: "widget18",
    name: "Current Tasks",
    component: Widget18,
    defaultSize: { w: 9, h: 4 },
  },
  {
    id: "widget19",
    name: "Calculations",
    component: Widget19,
    defaultSize: { w: 9, h: 4 },
  },
  {
    id: "widget20",
    name: "Data Matrix",
    component: Widget20,
    defaultSize: { w: 3, h: 4 },
  },
  {
    id: "widget21",
    name: "KPI Dashboard",
    component: Widget21,
    defaultSize: { w: 6, h: 4 },
  },
];

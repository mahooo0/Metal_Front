import Widget1 from "@/features/dashboard/ui/widgets/3-1/widget1";
import Widget2 from "@/features/dashboard/ui/widgets/3-1/widget2";
import Widget3 from "@/features/dashboard/ui/widgets/3-1/widget3";
import Widget4 from "@/features/dashboard/ui/widgets/3-1/widget4";
import Widget5 from "@/features/dashboard/ui/widgets/3-1/widget5";
import Widget6 from "@/features/dashboard/ui/widgets/3-1/widget6";
import Widget7 from "@/features/dashboard/ui/widgets/3-2/widget7";
import Widget8 from "@/features/dashboard/ui/widgets/3-2/widget8";
import Widget9 from "@/features/dashboard/ui/widgets/3-2/widget9";

// Widget configuration with default sizes
export const widgetComponents: {
  [key: string]: {
    component: React.ComponentType;
    defaultSize: { w: number; h: number };
  };
} = {
  widget1: { component: Widget1, defaultSize: { w: 3, h: 1 } },
  widget2: { component: Widget2, defaultSize: { w: 3, h: 1 } },
  widget3: { component: Widget3, defaultSize: { w: 3, h: 1 } },
  widget4: { component: Widget4, defaultSize: { w: 3, h: 1 } },
  widget5: { component: Widget5, defaultSize: { w: 3, h: 1 } },
  widget6: { component: Widget6, defaultSize: { w: 3, h: 1 } },
  widget7: { component: Widget7, defaultSize: { w: 3, h: 2 } },
  widget8: { component: Widget8, defaultSize: { w: 3, h: 2 } },
  widget9: { component: Widget9, defaultSize: { w: 3, h: 2 } },
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
    defaultSize: { w: 3, h: 2 },
  },
];

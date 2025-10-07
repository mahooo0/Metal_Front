"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  CheckSquare,
  ChevronLeft,
  ClipboardList,
  Divide,
  FileText,
  LayoutDashboard,
  Package,
  PieChart,
  ShoppingCart,
  User,
  Users,
  Wallet,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Замовлення", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Задачі", href: "/dashboard/tasks", icon: ClipboardList },
  { name: "Заявки", href: "/dashboard/applications", icon: FileText },
  {
    name: "Фінанси",
    href: "/dashboard/finance",
    icon: Wallet,
    children: [
      { name: "Рух коштів", href: "/dashboard/finance" },
      { name: "Витрати компанії", href: "/dashboard/planning" },
    ],
  },
  { name: "Контрагенти", href: "/dashboard/counterparties", icon: Users },
  {
    name: "Реєстр планів",
    href: "/dashboard/plan-register",
    icon: CheckSquare,
  },
  { name: "Виробництво", href: "/dashboard/production", icon: Package },
  { name: "Склад", href: "/dashboard/warehouse", icon: Box },
  { name: "Користувачі", href: "/dashboard/users", icon: User },
  {
    name: "Аналітика та планування",
    href: "/dashboard/analytics",
    icon: PieChart,
    children: [
      { name: "Аналітика", href: "/dashboard/analytics" },
      { name: "Планування", href: "/dashboard/planning" },
    ],
  },
];

export default function DashboardAside() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("");

  return (
    <aside className="w-[90px]  bg-white border-r border-gray-200 h-[calc(100vh-120px)] sticky top-[120px] z-10  rounded-tr-[24px]">
      <div className="w-full h-full relative">
        <div className=" pt-[24px] z-30 bg-white relative rounded-tr-[24px] h-full">
          {/* Dashboard Header */}

          {/* Navigation */}
          <nav className="flex flex-col gap-4 w-full h-full">
            {navigation.map(item => {
              const isActive = pathname === item.href;
              return (
                <Button
                  onMouseEnter={() => {
                    if (item.children) setActiveTab(item.name);
                  }}
                  key={item.name}
                  className="flex items-center justify-center w-full flex-col gap-1 h-fit  bg-transparent hover:bg-transparent text-[#3A4754] p-0 shadow-none"
                  asChild>
                  <Link href={item.href} className="w-full">
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 min-h-10",
                        isActive && "bg-[#3A4754] rounded-full"
                      )}>
                      <item.icon
                        size={24}
                        className={cn(
                          "min-w-6 min-h-6",
                          isActive && "text-white"
                        )}
                      />
                    </div>
                    <p className="text-[12px] font-[400] text-wrap  leading-[150%] transition-colors  text-center">
                      {item.name}
                    </p>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
        {activeTab && (
          <div
            onMouseLeave={() => setActiveTab("")}
            className="w-[352px] h-full absolute left-0 top-0 bg-[#D2EAFE] z-20 rounded-tr-[17px] flex justify-end px-[24px] py-[18px]">
            <div className="w-[216px] h-full flex flex-col">
              <Button
                variant="ghost"
                size="sm"
                className="w-full bg-transparent hover:bg-transparent border-b text-[#3A4754] border-[#B6BDC3] pb-[8px] rounded-none justify-start !px-0">
                <ChevronLeft className="w-4 h-4" />
                Назад
              </Button>
              <div className="flex flex-col gap-2 mt-[24px]">
                {navigation
                  .find(item => item.name === activeTab)
                  ?.children?.map(item => (
                    <Button
                      key={item.name}
                      className="bg-[#E8F4FE] hover:bg-white text-[#3A4754] px-3 py-2 rounded-md text-start flex items-center justify-start gap-2 ">
                      <Link href={item.href}>{item.name}</Link>
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

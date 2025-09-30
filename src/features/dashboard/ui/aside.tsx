"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  CheckSquare,
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
  { name: "Фінанси", href: "/dashboard/finance", icon: Wallet },
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
  },
];

export default function DashboardAside() {
  const pathname = usePathname();

  return (
    <aside className="w-[90px] bg-white border-r border-gray-200 h-[calc(100vh-120px)] sticky top-[120px] z-10  rounded-tr-[24px]">
      <div className=" pt-[24px] ">
        {/* Dashboard Header */}

        {/* Navigation */}
        <nav className="flex flex-col gap-4 w-full">
          {navigation.map(item => {
            const isActive = pathname === item.href;
            return (
              <Button
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
    </aside>
  );
}

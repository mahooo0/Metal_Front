"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { ChevronDown } from "lucide-react";

import { cn } from "@/shared/lib";
import { Separator } from "@/shared/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

const navigationItems = [
  { id: "all-calculations", label: "Всі прорахунки" },
  { id: "result", label: "Результат" },
  { id: "initial-data", label: "Вихідні дані" },
  { id: "additional-services", label: "Додаткові послуги" },
  { id: "commercial-proposal", label: "Комерційна пропозиція" },
  { id: "application-real", label: "Заявка на рах.(реал.)" },
  { id: "application-post", label: "Заявка на рах.(посл.)" },
  { id: "approx-time", label: "Прибл. час порізки" },
  { id: "detailed-calculation", label: "Подетальний прорах." },
];

export function CalculationsNavbar({ orderId }: { orderId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("initial-data");

  // Set active tab based on URL parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleNavigation = (itemId: string) => {
    setActiveTab(itemId);

    // Navigation logic based on itemId
    switch (itemId) {
      case "all-calculations":
        router.push(
          `/dashboard/order/${orderId}/calculations?tab=all-calculations`
        );
        break;
      case "result":
        router.push(`/dashboard/order/${orderId}/calculations?tab=result`);
        break;
      case "initial-data":
        router.push(
          `/dashboard/order/${orderId}/calculations?tab=initial-data`
        );
        break;
      case "additional-services":
        router.push(
          `/dashboard/order/${orderId}/calculations?tab=additional-services`
        );
        break;
      case "commercial-proposal":
        router.push(
          `/dashboard/order/${orderId}/calculations?tab=commercial-proposal`
        );
        break;
      case "application-real":
        router.push(
          `/dashboard/order/${orderId}/calculations?tab=application-real`
        );
        break;
      case "application-post":
        router.push(
          `/dashboard/order/${orderId}/calculations?tab=application-post`
        );
        break;
      case "approx-time":
        router.push(`/dashboard/order/${orderId}/calculations?tab=approx-time`);
        break;
      case "detailed-calculation":
        router.push(
          `/dashboard/order/${orderId}/calculations?tab=detailed-calculation`
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full max-w-full bg-white rounded-[16px] mt-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="navigation" className="border-none ">
          <AccordionTrigger className="px-[28px] py-4 hover:no-underline [&[data-state=open]>svg]:rotate-180 [&>svg]:hidden">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center text-[#3A4754] gap-2">
                <span className="text-[18px] font-regular">Замовник:</span>
                <span className="font-bold text-[28px]">ТОВ Базис</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                  <Button variant="balck" className="w-[160px] rounded-[24px]">
                    <Image
                      src="/laser-icon.svg"
                      alt="Лазер"
                      width={16}
                      height={16}
                      className="h-4 w-4 "
                    />
                    Лазер
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Профіль</DropdownMenuItem>
                  <DropdownMenuItem>Налаштування</DropdownMenuItem>
                  <DropdownMenuItem>Вийти</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-[28px] pb-4 border-t">
            <Separator />
            <div className="flex items-center gap-4 overflow-x-auto justify-between scrollbar-hide py-2">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={cn(
                    "whitespace-nowrap px-3 py-2 text-xs font-normal transition-colors border-b-2 border-transparent hover:text-primary",
                    activeTab === item.id
                      ? "text-blue-600 border-blue-600"
                      : "text-muted-foreground "
                  )}>
                  {item.label}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

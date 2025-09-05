import { useState } from "react";

import Image from "next/image";

import NeqrVockax from "@/public/neqr_s_ockami.png";
import order from "@/public/order.svg";
import { ArrowLeft, SquarePlus } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/shared/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export function OrdersSheet() {
  const [sheet, setsheet] = useQueryState("sheet", {
    defaultValue: "",
  });
  const [OderId, setOderId] = useQueryState("OderID", {
    defaultValue: "",
  });
  const [createOrder, setCreateOrder] = useQueryState("createOrder", {
    defaultValue: "false",
  });
  return (
    <Sheet
      open={sheet === "tasks" && OderId === "" && createOrder === "false"}
      onOpenChange={open => {
        setsheet(open ? "tasks" : "");
        setCreateOrder("false");
      }}>
      <SheetContent className="min-w-[620px] [&>button]:hidden px-[24px] py-[20px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetClose asChild>
              <Button
                variant="outline"
                size="lg"
                className="shadow-none border-none">
                <ArrowLeft /> Назад
              </Button>
            </SheetClose>

            <Button
              variant="balck"
              size="lg"
              onClick={() => setCreateOrder("true")}>
              <SquarePlus />
              Створити нову
            </Button>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4 flex-1">
          <div className="flex items-center gap-2">
            <Image src={order} width={36} height={36} alt="logo" />
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              Задачі по замовленню
            </h2>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white">
              <TabsTrigger
                value="current"
                className="bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none data-[state=active]:shadow-none data-[state=active]:text-blue-500 border-b-2 border-transparent">
                Поточні
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="text-gray-500 bg-transparent border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:shadow-none rounded-none data-[state=active]:border-blue-500 data-[state=active]:text-blue-500">
                Виконані
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="pb-4">
              {/* Task List */}
              <div className="flex flex-col gap-4 h-[calc(100vh-216px)] py-4 overflow-y-auto">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    onClick={() => setOderId(index.toString())}
                    key={index}
                    className=" rounded-lg p-4 bg-[#F6F6F6] shadow-sm">
                    <div className="flex items-end justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <h3 className="text-[#3A4754] font-bold text-base">
                          Тип задачі
                        </h3>
                        <span className="text-[#6D7A87] text-xs">
                          12.10.2025
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src={NeqrVockax}
                          alt="User avatar"
                          width={24}
                          height={24}
                          className="rounded-full object-cover"
                        />
                        <span className="text-[#3A4754] text-sm ">
                          Ковальчук А.В.
                        </span>
                      </div>
                    </div>

                    <p className="text-[#929BA5] text-sm  line-clamp-2">
                      Lorem ipsum dolor sit amet consectetur. Quam tincidunt
                      lorem ultrices commodo. Viverra non proin cras sagittis
                      tellus massa feugiat. Elit at pellentesque elementu...
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="text-center text-[#929BA5] py-8">
                Немає виконаних задач
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { useState } from "react";

import Image from "next/image";

import order from "@/public/order.svg";
import { ArrowLeft, SquarePlus } from "lucide-react";
import { useQueryState } from "nuqs";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { Textarea } from "@/shared/ui/textarea";

import { FileUploadSection } from "../file-upload-section";

export function CreateOrderSheet() {
  const [createOrder, setCreateOrder] = useQueryState("createOrder", {
    defaultValue: "false",
  });
  return (
    <Sheet
      open={createOrder === "true"}
      onOpenChange={open => setCreateOrder(open ? "true" : "false")}>
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
          </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="flex items-center gap-2">
            <Image src={order} width={36} height={36} alt="logo" />
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              Створення нової задачі
            </h2>
          </div>
          <form className="grid gap-5">
            <div className="grid gap-2">
              <Label
                htmlFor="sheet-demo-name"
                className="text-sm text-[#3A4754] font-medium">
                Оберіть тип задачі{" "}
              </Label>
              <Select>
                <SelectTrigger className=" min-h-[48px] w-full rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  {" "}
                  <SelectValue placeholder="Оберіть тип задачі" />
                </SelectTrigger>
                <SelectContent>
                  {" "}
                  <SelectItem value="1"> Нова задачя</SelectItem>{" "}
                  <SelectItem value="2"> Прорахунок</SelectItem>
                  <SelectItem value="3"> Уточнення</SelectItem>{" "}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="sheet-demo-username"
                className="text-sm text-[#3A4754] font-medium">
                Відповідальний
              </Label>
              <Select>
                <SelectTrigger className=" min-h-[48px] w-full rounded-[48px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  {" "}
                  <SelectValue placeholder="Оберіть тип задачі" />
                </SelectTrigger>
                <SelectContent>
                  {" "}
                  <SelectItem value="1"> Нова задачя</SelectItem>{" "}
                  <SelectItem value="2"> Прорахунок</SelectItem>
                  <SelectItem value="3"> Уточнення</SelectItem>{" "}
                </SelectContent>
              </Select>{" "}
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="sheet-demo-username"
                className="text-sm text-[#3A4754] font-medium">
                Опис задачі
              </Label>
              <Textarea
                className=" min-h-[48px] w-full rounded-[16px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                placeholder="Опис задачі"
              />
            </div>
            <FileUploadSection title="згорнути" />
          </form>
        </div>
        <SheetFooter className="flex items-center justify-between flex-row gap-6">
          <SheetClose asChild className="w-1/2">
            <Button variant="BlackTransparent" size="lg">
              Відхилити
            </Button>
          </SheetClose>
          <Button type="submit" variant="balck" size="lg" className="w-1/2">
            Створити
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

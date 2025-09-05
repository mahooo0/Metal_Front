import Image from "next/image";

import aplication from "@/public/aplication.svg";
import NeqrVockax from "@/public/neqr_s_ockami.png";
import {
  Calendar,
  Clock,
  FileText,
  Send,
  SquarePlus,
  User,
  X,
} from "lucide-react";
import { useQueryState } from "nuqs";

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
  SheetHeader,
} from "@/shared/ui/sheet";
import { Textarea } from "@/shared/ui/textarea";
import Tiptap from "@/shared/ui/tiptap";

export function ApplicationsAddSheet() {
  const [sheet, setsheet] = useQueryState("sheet", {
    defaultValue: "",
  });
  const [AddApplications, setAddApplications] = useQueryState(
    "AddApplications",
    {
      defaultValue: "",
    }
  );
  return (
    <Sheet
      open={sheet === "applications" && AddApplications !== ""}
      onOpenChange={open => {
        setsheet(open ? "applications" : "");
        setAddApplications("");
      }}>
      <SheetContent className="min-w-[620px] [&>button]:hidden px-[24px] py-[20px]">
        <SheetHeader>
          <div className="flex items-center pb-3 border-b border-[#E0E0E0] justify-between">
            <SheetClose className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="shadow-none rounded-full  border  w-5  h-5  border-[#3A4754] text-[#3A4754]">
                <X className="max-w-3 max-h-3" size={16} />
              </Button>
              <p className="text-sm text-[#3A4754]">Закрити</p>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4 flex-1 h-[calc(100vh-100px)] overflow-y-auto">
          <div className="flex items-center gap-2">
            <Image src={aplication} width={36} height={36} alt="logo" />
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              Створити нову заявку{" "}
            </h2>
          </div>

          {/* Task Information Section */}
          <form className="grid gap-5">
            <div className="grid gap-2">
              <Label
                htmlFor="sheet-demo-username"
                className="text-sm text-[#3A4754] font-medium">
                Оберіть тип заявки
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
                Опис заявки{" "}
              </Label>
              <Textarea
                className=" min-h-[48px] w-full rounded-[16px]  bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                placeholder="Опис заявки"
              />
            </div>
          </form>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium text-[#3A4754]">Відповідь</h3>
            <Tiptap />
          </div>
          <div className="flex flex-row gap-2">
            <Button variant="BlackTransparent" size="lg" className="w-1/2">
              Відхилити
            </Button>{" "}
            <Button variant="balck" size="lg" className="w-1/2">
              Зберегти заявку{" "}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

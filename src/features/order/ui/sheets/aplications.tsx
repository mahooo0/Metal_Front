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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/shared/ui/sheet";
import Tiptap from "@/shared/ui/tiptap";

import { FileUploadSection } from "../file-upload-section";

export function ApplicationsSheet() {
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
      open={sheet === "applications" && AddApplications === ""}
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
            <Button
              variant="balck"
              size="lg"
              onClick={() => setAddApplications("true")}>
              <SquarePlus />
              Створити нову
            </Button>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-4 flex-1 h-[calc(100vh-100px)] overflow-y-auto">
          <div className="flex items-center gap-2">
            <Image src={aplication} width={36} height={36} alt="logo" />
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              Заявки по замовленню{" "}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-row gap-[36px] mt-5">
            <div className="flex flex-row justify-center items-center gap-2">
              <p className="text-sm text-[#6D7A87]">Створив:</p>
              <Image
                src={NeqrVockax}
                alt="User avatar"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <h4 className="text-sm text-[#3A4754] font-medium">
                  Ковальчук А.В.
                </h4>
              </div>
            </div>{" "}
            <div className="flex flex-row justify-center items-center gap-2">
              <p className="text-sm text-[#6D7A87]">Створив:</p>
              <Image
                src={NeqrVockax}
                alt="User avatar"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <h4 className="text-sm text-[#3A4754] font-medium">
                  Ковальчук А.В.
                </h4>
              </div>
            </div>
          </div>

          {/* Task Information Section */}
          <div className=" space-y-4">
            {/* Created Date */}
            <div className="flex items-center gap-3">
              <div className="flex flex-row items-center gap-2 min-w-[160px]">
                <Clock className="w-5 h-5 text-[#6D7A87]" />
                <div className="text-sm text-[#6D7A87]">Створено</div>
              </div>
              <div className="text-base font-medium text-[#3A4754]">
                15/08/2017
              </div>
            </div>

            {/* Order Number */}
            <div className="flex items-center gap-3">
              <div className="flex flex-row items-center gap-2 min-w-[160px]">
                <User className="w-5 h-5 text-[#6D7A87]" />
                <div className="text-sm text-[#6D7A87]">Сутність</div>
              </div>
              <div className="text-base font-medium text-[#3A4754]">
                № замовлення
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-3">
              <div className="flex flex-row items-center gap-2 min-w-[160px]">
                <Calendar className="w-5 h-5 text-[#6D7A87]" />
                <div className="text-sm text-[#6D7A87]">Дата завершення</div>
              </div>
              <div className="text-base font-medium text-[#3A4754]">
                15/08/2017
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start gap-3">
              <div className="flex flex-row items-center gap-2 min-w-[160px]">
                <FileText className="w-5 h-5 text-[#6D7A87]" />
                <div className="text-sm text-[#6D7A87] mt-1">Опис</div>
              </div>
              <div className="text-base text-[#3A4754] leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Facilisi ut arcu erat
                tortor habitant posuere.
              </div>
            </div>
          </div>
          <div className="w-full h-0.5 bg-[#C8CDD2]"></div>

          <FileUploadSection title="згорнути" />
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium text-[#3A4754]">Відповідь</h3>
            <Tiptap />
          </div>
          <div className="flex flex-row gap-2">
            <Button variant="BlackTransparent" size="lg" className="w-1/2">
              Відхилити
            </Button>{" "}
            <Button variant="balck" size="lg" className="w-1/2">
              Погодити
            </Button>
          </div>
          <div className="space-y-2 ">
            <label className="text-sm font-medium text-[#3A4754]">
              Ваш коментар
            </label>
            <div className="flex gap-3 mt-1">
              <Input
                type="text"
                placeholder="input_label"
                className="bg-white"
              />

              <Button
                variant="blue"
                size={"lg"}
                className="rounded-[48px] h-[48px]">
                <Send className="w-4 h-4 mr-2" />
                Надіслати
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-[32px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="flex gap-3" key={index}>
                <img
                  src={NeqrVockax.src}
                  alt="Henry Arthur"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-[#3A4754]">
                      Henry Arthur
                    </span>
                    <span className="text-xs text-[#6D7A87]">
                      3 години тому
                    </span>
                  </div>
                  <p className="text-sm text-[#3A4754] leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur. Eget sed netus
                    ultrices pellentesque et lectus. Mauris faucibus malesuada
                    maecenas tincidunt. In sed volutpat malesuada id dictum
                    vehicula malesuada. Maecenas ut libero scelerisque lectus
                    erat. Ultrices pretium mauris sit cras. Sed...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

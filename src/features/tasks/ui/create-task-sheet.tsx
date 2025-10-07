import { ArrowLeft, ListTodo } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/shared/ui/button";
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
  SheetFooter,
  SheetHeader,
} from "@/shared/ui/sheet";
import { Textarea } from "@/shared/ui/textarea";

import { FileUploadSection } from "../../order/ui/file-upload-section";

export function CreateTaskSheet() {
  const [createTask, setCreateTask] = useQueryState("createTask", {
    defaultValue: "false",
  });

  return (
    <Sheet
      open={createTask === "true"}
      onOpenChange={open => setCreateTask(open ? "true" : "false")}>
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
            <div className="w-9 h-9 rounded-lg bg-[#3A4754] flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[24px] text-[#3A4754] font-bold">
              Створення задачі
            </h2>
          </div>
          <form className="grid gap-5">
            <div className="grid gap-2">
              <Label
                htmlFor="task-type"
                className="text-sm text-[#3A4754] font-medium">
                Оберіть тип задачі
              </Label>
              <Select>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prorahunok">Прорахунок</SelectItem>
                  <SelectItem value="logistyka">Логістика</SelectItem>
                  <SelectItem value="pogodzhennya">Погодження</SelectItem>
                  <SelectItem value="hidra">Гідра</SelectItem>
                  <SelectItem value="sklad">Склад</SelectItem>
                  <SelectItem value="gnutttya">Гнуття</SelectItem>
                  <SelectItem value="laser">Лазер</SelectItem>
                  <SelectItem value="realizatsiya">Реалізація</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="responsible"
                className="text-sm text-[#3A4754] font-medium">
                Відповідальний
              </Label>
              <Select>
                <SelectTrigger className="min-h-[48px] w-full rounded-[48px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm">
                  <SelectValue placeholder="input_label" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ralph">Ralph Edwards</SelectItem>
                  <SelectItem value="eleanor">Eleanor Pena</SelectItem>
                  <SelectItem value="esther">Esther Howard</SelectItem>
                  <SelectItem value="devon">Devon Lane</SelectItem>
                  <SelectItem value="leslie">Leslie Alexander</SelectItem>
                  <SelectItem value="jerome">Jerome Bell</SelectItem>
                  <SelectItem value="albert">Albert Flores</SelectItem>
                  <SelectItem value="kristin">Kristin Watson</SelectItem>
                  <SelectItem value="cameron">Cameron Williamson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="description"
                className="text-sm text-[#3A4754] font-medium">
                Опис задачі
              </Label>
              <Textarea
                id="description"
                className="min-h-[120px] w-full rounded-[16px] bg-white px-4 py-3 placeholder:text-[#B6BDC3] border border-[#C8CDD2] placeholder:text-sm"
                placeholder="text_area"
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
            Зберегти задачу
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

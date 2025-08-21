import { MailIcon } from "lucide-react";
import { PhoneIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { PasswordInput } from "@/shared/ui/password-input";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-9", className)} {...props}>
      <div className="flex flex-col text-start gap-2 ">
        <p className=" text-2xl text-center font-bold text-[#3A4754] max-w-[457px]">
          Забули пароль?{" "}
        </p>
      </div>
      <div className="grid gap-5 max-w-[418px]">
        <div className="grid gap-3">
          <Label htmlFor="login" className="text-sm text-[#3A4754]">
            Логин
          </Label>
          <Input id="login" type="text" placeholder="Введіть логін" required />
        </div>
        <p className="text-base font-normal text-center text-[#6D7A87]">
          Оберіть, куди буде відправлено тимчасовий пароль
        </p>
        <div className="flex gap-5 justify-center w-full">
          <button className="bg-[#3A4754] w-[36px] h-[36px] rounded-full flex items-center justify-center hover:bg-[#263038] cursor-pointer">
            <MailIcon className="w-4.5 h-4.5" color="#fff" />
          </button>
          <button className="bg-[#3A4754] w-[36px] h-[36px] rounded-full flex items-center justify-center hover:bg-[#263038] cursor-pointer">
            <PhoneIcon className="w-4.5 h-4.5" color="#fff" />
          </button>
        </div>
        <Button size="lg" type="submit" className="w-full">
          Надіслати{" "}
        </Button>
      </div>
    </form>
  );
}

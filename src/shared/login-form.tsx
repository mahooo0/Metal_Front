"use client";

import { useState } from "react";

import Link from "next/link";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className={cn("flex flex-col gap-9", className)} {...props}>
      <div className="flex flex-col text-start gap-2 ">
        <h1 className="text-base font-normal text-[#6D7A87]">
          З ПОВЕРНЕННЯМ 👋🏻
        </h1>
        <p className=" text-2xl font-bold text-[#3A4754] max-w-[457px]">
          Перейдіть до свого облікового запису{" "}
        </p>
      </div>
      <div className="grid gap-5 max-w-[386px]">
        <div className="grid gap-3">
          <Label htmlFor="login" className="text-sm text-[#3A4754]">
            Логин
          </Label>
          <Input id="login" type="text" placeholder="Введіть логін" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-sm text-[#3A4754]">
              Пароль
            </Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="Введіть пароль"
              required
              value={showPassword ? "123456" : ""}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2">
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
        <Button size="lg" type="submit" className="w-full" asChild>
          <Link href="/dashboard">УВІЙТИ</Link>
        </Button>
      </div>
      <div className="text-start text-base text-[#6D7A87] ">
        Забули пароль?{" "}
        <Link
          href="/reset-password"
          className="text-[#3A4754]  text-base font-semibold uppercase hover:underline">
          Перейдіть за посиланням{" "}
        </Link>
      </div>
    </form>
  );
}

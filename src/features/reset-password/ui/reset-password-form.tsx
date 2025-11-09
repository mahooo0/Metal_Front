"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon, PhoneIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { useResetPassword } from "@/features/auth/hooks";
import {
  type RecoverySchemaType,
  recoverySchema,
} from "@/features/auth/schemas";

import { cn } from "@/shared/lib/utils";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";

type DeliveryMethod = "email" | "phone";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("email");
  const { resetPassword, isResetPasswordPending } = useResetPassword();

  const form = useForm<RecoverySchemaType>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: RecoverySchemaType) => {
    resetPassword(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-9", className)}
        {...props}>
        <div className="flex flex-col text-start gap-2">
          <p className="text-2xl text-center font-bold text-[#3A4754] max-w-[457px]">
            Забули пароль?
          </p>
        </div>

        <div className="grid gap-5 max-w-[418px]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#3A4754]">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Введіть email"
                    disabled={isResetPasswordPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-base font-normal text-center text-[#6D7A87]">
            Оберіть, куди буде відправлено тимчасовий пароль
          </p>

          <div className="flex gap-5 justify-center w-full">
            <button
              type="button"
              onClick={() => setDeliveryMethod("email")}
              className={cn(
                "w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer transition-colors",
                deliveryMethod === "email"
                  ? "bg-[#3A4754] hover:bg-[#263038]"
                  : "bg-[#6D7A87] hover:bg-[#5a6570]"
              )}>
              <MailIcon className="w-4.5 h-4.5" color="#fff" />
            </button>
            <button
              type="button"
              onClick={() => setDeliveryMethod("phone")}
              className={cn(
                "w-[36px] h-[36px] rounded-full flex items-center justify-center cursor-pointer transition-colors",
                deliveryMethod === "phone"
                  ? "bg-[#3A4754] hover:bg-[#263038]"
                  : "bg-[#6D7A87] hover:bg-[#5a6570]"
              )}>
              <PhoneIcon className="w-4.5 h-4.5" color="#fff" />
            </button>
          </div>

          <Button
            size="lg"
            type="submit"
            className="w-full"
            disabled={isResetPasswordPending}>
            Надіслати
          </Button>
        </div>
      </form>
    </Form>
  );
}

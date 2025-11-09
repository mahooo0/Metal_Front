"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useNewPassword } from "@/features/auth/hooks";
import {
  NewPasswordSchemaType,
  newPasswordSchema,
} from "@/features/auth/schemas";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordInput,
} from "@/shared/ui";

export function NewPasswordForm() {
  const { newPassword, isNewPasswordPending } = useNewPassword();

  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      passwordRepeat: "",
    },
  });

  const onSubmit = (values: NewPasswordSchemaType) => {
    newPassword(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9">
        {/* Форма */}
        <div className="grid gap-5 max-w-[386px]">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#3A4754]">
                  Новий пароль
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    disabled={isNewPasswordPending}
                    placeholder="Введіть новий пароль"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordRepeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#3A4754]">
                  Підтвердіть пароль
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    disabled={isNewPasswordPending}
                    placeholder="Підтвердіть новий пароль"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isNewPasswordPending}>
            ОНОВИТИ ПАРОЛЬ
          </Button>
        </div>
      </form>
    </Form>
  );
}

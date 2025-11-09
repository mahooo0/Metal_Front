"use client";

import { useState } from "react";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLogin } from "@/features/auth/hooks";
import { type LoginSchemaType, loginSchema } from "@/features/auth/schemas";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PasswordInput,
} from "@/shared/ui";

export function LoginForm() {
  const [isShowCode, setIsShowCode] = useState(false);

  const { login, isLoginPending } = useLogin(setIsShowCode);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      token: "",
    },
  });

  const onSubmit = (values: LoginSchemaType) => {
    login({ values, recaptcha: "" });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9">
        {/* Заголовок */}

        {/* Форма */}
        <div className="grid gap-5 max-w-[386px]">
          {isShowCode ? (
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-[#3A4754]">
                    Код підтвердження
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoginPending}
                      placeholder="Введіть код"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-[#3A4754]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoginPending}
                        placeholder="Введіть email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-[#3A4754]">
                      Пароль
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={isLoginPending}
                        placeholder="Введіть пароль"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoginPending}>
            УВІЙТИ
          </Button>
        </div>

        {/* Забули пароль */}
        <div className="text-start text-base text-[#6D7A87] text-nowrap">
          Забули пароль?{" "}
          <Link
            href="/auth/reset"
            className="text-[#3A4754] text-nowrap text-base font-semibold uppercase hover:underline">
            Перейдіть за посиланням
          </Link>
        </div>
      </form>
    </Form>
  );
}

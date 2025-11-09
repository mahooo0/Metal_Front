"use client";

import Image from "next/image";

import logo from "@/public/Logo.png";
import loginImage from "@/public/login.png";

import { NewPasswordForm } from "@/features/auth";

import { AuthWrapper } from "@/shared/ui";

export function NewPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 px-4 sm:px-8 lg:px-16 xl:px-[64px] py-8 lg:py-[71px] w-full">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Image src={logo} alt="Company logo" className="mt-[58px]" />
        </div>
        <div className="flex flex-1 items-center justify-start">
          <div className="w-full">
            <AuthWrapper
              className="w-[400px]"
              heading="ОНОВЛЕННЯ ПАРОЛЮ 🔒"
              description="Введіть новий пароль для вашого облікового запису"
              isShowSocial={false}>
              <NewPasswordForm />
            </AuthWrapper>
          </div>
        </div>
      </div>
      <div className="lg:flex hidden justify-center items-center">
        <Image src={loginImage} alt="Image" className="object-fit w-[550px]" />
      </div>
    </div>
  );
}

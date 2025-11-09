"use client";

import { useState } from "react";

import Image from "next/image";

import logo from "@/public/Logo.png";
import loginImage from "@/public/login.png";

import { LoginForm } from "@/features/auth";

// import { LoginForm } from "@/features/login/ui/login-form";

import { AuthWrapper } from "@/shared/ui";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 px-[64px] py-[71px] w-full">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start ">
          <Image src={logo} alt="logo" className="mt-[58px]" />
        </div>
        <div className="flex flex-1 items-center justify-start">
          <div className="w-full ">
            {/* <LoginForm /> */}
            <AuthWrapper
              className="w-[400px]"
              heading="З ПОВЕРНЕННЯМ 👋🏻"
              description="Перейдіть до свого облікового запису"
              isShowSocial>
              <LoginForm />
            </AuthWrapper>
          </div>
        </div>
      </div>
      <div className="   lg:flex hidden justify-center items-center">
        <img
          src={loginImage.src}
          alt="Image"
          className="  object-fit w-[550px] "
        />
      </div>
    </div>
  );
}

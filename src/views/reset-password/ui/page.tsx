import Image from "next/image";

import logo from "@/public/Logo.png";
import loginImage from "@/public/login.png";

import { ResetPasswordForm } from "@/shared/reset-password-form";

export default function ResetPassword() {
  return (
    <div className=" h-screen px-[64px] py-[71px] grid lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start ">
          <Image src={logo} alt="logo" className="mt-[58px]" />
        </div>
        <div className="flex flex-1 items-center justify-start">
          <div className="w-full ">
            <ResetPasswordForm />
          </div>
        </div>
      </div>

      {/* Right Section - Decorative Pattern */}
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

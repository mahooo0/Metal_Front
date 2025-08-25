"use client";

import Image from "next/image";

import Logo from "@/public/Logo.png";
import {
  Bell,
  Calendar,
  ChevronLeft,
  LogOut,
  Search,
  Settings,
  Shield,
  User,
} from "lucide-react";

import { useLogout } from "@/features/user";

import { useProfile } from "@/shared/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";

export default function DashboardHeader() {
  const { logout } = useLogout();
  const { user } = useProfile();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className=" py-[20px] px-6">
      <div className="bg-white px-3 py-4  rounded-[48px] ">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Back Button */}
          <div className="flex items-center  gap-[90px]">
            {/* Logo */}
            <Image src={Logo.src} alt="Logo" width={78} height={30} />

            {/* Back Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-800">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Назад
            </Button>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3A4754] w-5 h-" />
              <Input
                placeholder="Пошук"
                className="pl-10  bg-white rounded-[48px] min-w-[240px]"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full border border-gray-200">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full border border-gray-200">
              <Calendar className="w-5 h-5 text-gray-600" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full border border-gray-200">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-gray-200">
                    <AvatarImage
                      src={user?.picture}
                      alt={user?.displayName || "User"}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.displayName || "User Name"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

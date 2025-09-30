"use client";

import React from "react";

import {
  Calendar,
  CircleUserRound,
  Clock,
  RotateCcw,
  User,
} from "lucide-react";

// Types for history logs
export interface HistoryLog {
  id: string;
  date: string;
  user: string;
  action: string;
  description: string;
}

// Mock data for history logs
const mockHistoryLogs: HistoryLog[] = [
  {
    id: "1",
    date: "15/08/2017",
    user: "Коваленко А.В.",
    action: "Дія",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget sed netus ultrices pellentesque et lectus. Mauris faucibus malesuada maecenas tincidunt. In sed volutpat malesuada id dictum vehicula malesuada. Maecenas ut libero scelerisque lectus erat. Ultrices",
  },
  {
    id: "2",
    date: "15/08/2017",
    user: "Коваленко А.В.",
    action: "Дія",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget sed netus ultrices pellentesque et lectus. Mauris faucibus malesuada maecenas tincidunt. In sed volutpat malesuada id dictum vehicula malesuada. Maecenas ut libero scelerisque lectus erat. Ultrices",
  },
  {
    id: "3",
    date: "15/08/2017",
    user: "Коваленко А.В.",
    action: "Дія",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget sed netus ultrices pellentesque et lectus. Mauris faucibus malesuada maecenas tincidunt. In sed volutpat malesuada id dictum vehicula malesuada. Maecenas ut libero scelerisque lectus erat. Ultrices",
  },
  {
    id: "4",
    date: "15/08/2017",
    user: "Коваленко А.В.",
    action: "Дія",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget sed netus ultrices pellentesque et lectus. Mauris faucibus malesuada maecenas tincidunt. In sed volutpat malesuada id dictum vehicula malesuada. Maecenas ut libero scelerisque lectus erat. Ultrices",
  },
  {
    id: "5",
    date: "15/08/2017",
    user: "Коваленко А.В.",
    action: "Дія",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget sed netus ultrices pellentesque et lectus. Mauris faucibus malesuada maecenas tincidunt. In sed volutpat malesuada id dictum vehicula malesuada. Maecenas ut libero scelerisque lectus erat. Ultrices",
  },
  {
    id: "6",
    date: "15/08/2017",
    user: "Коваленко А.В.",
    action: "Дія",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget sed netus ultrices pellentesque et lectus. Mauris faucibus malesuada maecenas tincidunt. In sed volutpat malesuada id dictum vehicula malesuada. Maecenas ut libero scelerisque lectus erat. Ultrices",
  },
];

export default function HistoryLogs() {
  return (
    <div className="max-w-full bg-white rounded-[16px] mt-5 p-6">
      <div className=" flex flex-col gap-9">
        {mockHistoryLogs.map(log => (
          <div key={log.id} className="space-y-4">
            {/* First Line - Date and User */}
            <div className="flex items-center gap-[48px]">
              <div className="flex items-center gap-2">
                <Clock className="h-5    w-5 text-[#6D7A87]" />
                <p className="text-sm text-[#3A4754]">
                  <span className="text-sm font-bold text-[#6D7A87]">
                    Дата{" "}
                  </span>
                  {log.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CircleUserRound className="h-5 w-5 text-[#6D7A87]" />
                <p className="text-sm text-[#3A4754]">
                  <span className="text-sm font-bold text-[#6D7A87]">
                    Користувач{" "}
                  </span>
                  {log.user}
                </p>
              </div>
            </div>

            {/* Second Line - Action and Description */}
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2 min-w-fit">
                <RotateCcw className="h-5 w-5 text-[#6D7A87]" />
                <span className="text-sm text-medium text-[#3A4754]">
                  {log.action}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#2D3145] leading-relaxed">
                  {log.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

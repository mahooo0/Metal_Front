import React from "react";

import { SquarePen } from "lucide-react";

import { Counterparty } from "@/features/orders/types/order-request.types";

import { Button } from "@/shared/ui/button";

interface ConturaqentProps {
  counterparty: Counterparty;
}

export default function Conturaqent({ counterparty }: ConturaqentProps) {
  return (
    <div className="bg-white rounded-2xl py-5 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M23.9993 4H7.99935C5.05268 4 2.66602 6.37333 2.66602 9.29333V22.7067C2.66602 25.6267 5.05268 28 7.99935 28H23.9993C26.946 28 29.3327 25.6267 29.3327 22.7067V9.29333C29.3327 6.37333 26.946 4 23.9993 4ZM11.3327 9.56C13.026 9.56 14.4127 10.9467 14.4127 12.64C14.4127 14.3333 13.026 15.72 11.3327 15.72C9.63935 15.72 8.25268 14.3333 8.25268 12.64C8.25268 10.9467 9.63935 9.56 11.3327 9.56ZM16.4927 22.2133C16.3727 22.3467 16.186 22.4267 15.9993 22.4267H6.66602C6.47935 22.4267 6.29268 22.3467 6.17268 22.2133C6.05268 22.08 5.98602 21.8933 5.99935 21.7067C6.22602 19.4667 8.01268 17.6933 10.2527 17.48C10.9593 17.4133 11.6927 17.4133 12.3993 17.48C14.6393 17.6933 16.4393 19.4667 16.6527 21.7067C16.6793 21.8933 16.6127 22.08 16.4927 22.2133ZM25.3327 22.3333H22.666C22.1193 22.3333 21.666 21.88 21.666 21.3333C21.666 20.7867 22.1193 20.3333 22.666 20.3333H25.3327C25.8793 20.3333 26.3327 20.7867 26.3327 21.3333C26.3327 21.88 25.8793 22.3333 25.3327 22.3333ZM25.3327 17H19.9993C19.4527 17 18.9993 16.5467 18.9993 16C18.9993 15.4533 19.4527 15 19.9993 15H25.3327C25.8793 15 26.3327 15.4533 26.3327 16C26.3327 16.5467 25.8793 17 25.3327 17ZM25.3327 11.6667H18.666C18.1193 11.6667 17.666 11.2133 17.666 10.6667C17.666 10.12 18.1193 9.66667 18.666 9.66667H25.3327C25.8793 9.66667 26.3327 10.12 26.3327 10.6667C26.3327 11.2133 25.8793 11.6667 25.3327 11.6667Z"
              fill="#3A4754"
            />
          </svg>
          <p className="text-[20px] font-bold text-[#3A4754]">Контрагент</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white w-[36px] h-[36px] rounded-full border border-[#B6BDC3] text-[#495969]">
          <SquarePen size={20} />
        </Button>
      </div>
      <h5 className="text-[24px] font-bold text-[#3A4754] mt-4">
        {counterparty.name}
      </h5>
      <p className="text-[14px] text-[#6D7A87] mt-2">id {counterparty.id}</p>
    </div>
  );
}

// Default size for this widget
export const defaultSize = { w: 3, h: 2 };

export default function Widget8() {
  return (
    <div className="flex flex-col p-4 h-full w-full justify-between bg-[#3A4754]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white font-medium">Lorem ipsum</p>
          <p className="text-2xl font-bold text-white">26 000€</p>
        </div>
        <div className=" w-[38px] h-[38px] border border-[#3CD3FC] rounded-full p-2 flex items-center justify-center">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.66675 18.5833H18.3334"
              stroke="#3CD3FC"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.125 3.58341V18.5834H11.875V3.58341C11.875 2.66675 11.5 1.91675 10.375 1.91675H9.625C8.5 1.91675 8.125 2.66675 8.125 3.58341Z"
              stroke="#3CD3FC"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.5 8.58341V18.5834H5.83333V8.58341C5.83333 7.66675 5.5 6.91675 4.5 6.91675H3.83333C2.83333 6.91675 2.5 7.66675 2.5 8.58341Z"
              stroke="#3CD3FC"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.1667 12.7499V18.5833H17.5001V12.7499C17.5001 11.8333 17.1667 11.0833 16.1667 11.0833H15.5001C14.5001 11.0833 14.1667 11.8333 14.1667 12.7499Z"
              stroke="#3CD3FC"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]  py-[10px] h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="w-3 h-3 rounded-full border border-[#8AE4FD] flex items-center justify-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#8AE4FD]"></div>
            </div>
            <p className="text-white text-[12px]">Lorem ipsum</p>
          </div>
          <p className="text-white text-[14px]">40</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="w-3 h-3 rounded-full border border-[#1D96F9] flex items-center justify-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#1D96F9]"></div>
            </div>
            <p className="text-white text-[12px]">Lorem ipsum</p>
          </div>
          <p className="text-white text-[14px]">40</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="w-3 h-3 rounded-full border border-[#6C5BF2] flex items-center justify-center">
              <div className="w-[9px] h-[9px] rounded-full bg-[#6C5BF2]"></div>
            </div>
            <p className="text-white text-[12px]">Lorem ipsum</p>
          </div>
          <p className="text-white text-[14px]">40</p>
        </div>
      </div>
    </div>
  );
}

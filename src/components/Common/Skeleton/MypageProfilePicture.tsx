import React from "react";

const MypageProfilePicture: React.FC = () => {
  return (
    <div className="px-6 pt-6 pb-10 s:p-0 s:pb-4 border-b-[1px] border-fillNormal animate-pulse">
      <div className="flex items-center flex-wrap s:mb-3 gap-5">
        <div className="w-36 h-36 m:w-40 m:h-40 s:w-36 s:h-36 rounded-[20px] bg-fillLight"></div>
        <div className="grid grid-cols-5 m:grid-cols-3 gap-2 s:mb-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="w-[52px] h-[52px] m:w-[48px] m:h-[48px] rounded-full m:rounded-[9px] bg-fillLight"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MypageProfilePicture;

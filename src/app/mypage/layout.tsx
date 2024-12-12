import React from "react";
import LeftNav from "@/components/MyPage/Common/LeftNav";

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen md:flex-row w-full mx-auto max-w-container-l m:max-w-container-m s:max-w-container-s gap-4 mt-8 mb-8 text-labelStrong">
      <LeftNav />
      <main className="flex-1 flex flex-col">
        <h1 className="hidden s:block border-b-[1px] border-labelAssistive pb-4 mb-5 text-subtitle font-subtitle text-labelStrong">
          마이페이지
        </h1>
        {children}
      </main>
    </div>
  );
};

export default MyPageLayout;

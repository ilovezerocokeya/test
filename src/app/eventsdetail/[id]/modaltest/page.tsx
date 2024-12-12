"use client";

import React from "react";
import { useModal } from "@/provider/ContextProvider";

const ModalTest: React.FC = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <div>
        <h2 className="pb-1">모달 제목</h2>
        <p>모달 내용입니다.</p>
      </div>,
    );
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="mb-3">모달 테스트</h1>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-black text-white font-semibold rounded-lg  focus:outline-none"
      >
        모달 열기
      </button>
    </div>
  );
};

export default ModalTest;

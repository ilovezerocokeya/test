"use client";

import React, { useEffect, useRef, useState } from "react"; 
import { useForm, SubmitHandler } from "react-hook-form";
import NicknameInput from "@/components/Signup/components/NicknameInput";
import useCheckNickname from "@/hooks/useCheckNickname";
import useSubmitProfile from "@/hooks/useSubmitProfile"; 
import { useUser } from "@/provider/UserContextProvider"; 

// 폼 데이터의 타입 정의
export interface FormValues {
  nickname: string; 
}

interface Signup03Type {
  setUserData: (data: any) => void; // 사용자 데이터를 설정하는 함수
}

// 회원가입 3단계 컴포넌트
const Signup03: React.FC<Signup03Type> = ({ setUserData }) => {
  const { prevStep } = useUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }, 
    setError,
  } = useForm<FormValues>(); // react-hook-form 훅을 사용하여 폼 초기화

  const watchNickname = watch("nickname"); // 닉네임 필드 감시
  const formRef = useRef<HTMLFormElement>(null); // 폼 요소에 대한 참조를 저장하는 useRef 훅을 사용하여 초기값을 null로 설정
  const nicknameAvailable = useCheckNickname(watchNickname); // 닉네임 사용 가능 여부 확인 훅
  const { onSubmit } = useSubmitProfile(setUserData); // 프로필 제출 훅

  // handleSubmit과 맞는 함수로 재정의한 onSubmitForm
  const onSubmitForm: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (nicknameAvailable === false) {
      setError("nickname", { message: "이미 사용 중인 닉네임입니다." });
      return;
    }
    await onSubmit(data, nicknameAvailable, setError); // 기존 onSubmit 호출
  };

  const handleConfirmSkip = () => {
    document.body.classList.remove("page-disabled");
    handleSubmit(onSubmitForm)(); // onSubmitForm이 handleSubmit와 연계되도록 호출
};



  useEffect(() => {
    console.log(`
      .d8888888b.                        888    888                                888
     d88P"   "Y88b                       888    888                                888
     888  d8b  888                       888    888                                888
     888  888  888      .d88b.   8888b.  888888 88888b.   .d88b.  888d888          88888b.   .d88b.  888d888  .d88b.
     888  888bd88P     d88P"88b     "88b 888    888 "88b d8P  Y8b 888P"            888 "88b d8P  Y8b 888P"   d8P  Y8b
     888  Y8888P"      888  888 .d888888 888    888  888 88888888 888              888  888 88888888 888     88888888
     Y88b.     .d8     Y88b 888 888  888 Y88b. 888  888 Y8b.     888              888  888 Y8b.     888     Y8b.
      "Y88888888P"      "Y88888 "Y888888  "Y888 888  888  "Y8888  888     88888888 888  888  "Y8888  888      "Y8888
                            888
                       Y8b d88P
                        "Y88P"
       `);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-50" style={{ marginTop: '-30px' }}>
      <div className="s:w-[370px] s:h-[580px] w-[430px] h-[610px] relative bg-background rounded-[20px] p-4 select-none border border-background shadow-lg">
        {prevStep && (
            <button 
              onClick={prevStep} 
              className="absolute left-9 top-10 text-primary transition-transform duration-300 ease-in-out hover:text-[white] hover:scale-110"
            >
              &larr;
            </button>
          )}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 flex space-x-2">
          <div className="w-[136px] s:h-18 h-20 justify-start items-center gap-2 inline-flex">
            <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#28282a] flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="self-stretch text-center text-[#5e5e5e] text-sm font-medium leading-[21px]">1</div>
            </div>
            <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#28282a] flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="self-stretch text-center text-[#5e5e5e] text-sm font-medium leading-[21px]">2</div>
            </div>
            <div className="w-10 h-10 p-2.5 rounded-[11px] border border-[#c3e88d] flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="self-stretch text-center text-[#c3e88d] text-sm font-medium leading-[21px]">3</div>
            </div>
          </div>
        </div>
  
        <div className="text-center text-2xl font-medium text-[#ffffff] leading-9 mt-20">
          거의 다 왔어요!
        </div>
        <div className="text-center text-[#9a9a9a] s:mt-1 mt-3">
          커뮤니티에서 나를 나타낼 이름을 설정해 주세요. <br /> 기억하기 쉬운 닉네임일수록 좋아요!
        </div>

        <form onSubmit={handleSubmit(handleConfirmSkip)} className="max-h-[380px] s:mt-26 mt-20">
        <NicknameInput register={register} errors={errors} nicknameAvailable={nicknameAvailable} watch={watch} />
          <div className="flex justify-center items-center s:mt-10 mt-12">
          <button
            type="submit"
            className={`s:w-[300px] w-[350px] h-[45px] mt-24 py-3 flex justify-center items-center rounded-2xl transition-transform transform hover:scale-105 active:scale-95 active:bg-gray-800 active:text-gray-200 ${
              watchNickname && watchNickname.trim() !== "" && nicknameAvailable
                ? "text-[#C3E88D]"  // 닉네임 사용 가능하면 텍스트 색상 변경
                : "text-[#FFFFFF]"  // 기본 텍스트 색상
            } bg-[#343437]`} 
            disabled={!watchNickname || watchNickname.trim() === "" || !nicknameAvailable} // 조건 만족 안 하면 비활성화
          >
            등록하기
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup03;
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/provider/UserContextProvider";
import Image from "next/image";
import LeftNavLoader from "@/components/Common/Skeleton/LeftNavLoader";
import { createClient } from "@/utils/supabase/client";

const LeftNav: React.FC = () => {
  const pathname = usePathname();
  const { user, userData, setUserData, loading } = useUser();
  const defaultImage = "/assets/header/user.svg";

  const getProfileImageUrl = (url: string) => `${url}?${new Date().getTime()}`;

  const jobTitleClassMap: { [key: string]: string } = {
    프론트엔드: "text-primary",
    IOS: "text-accentMaya",
    안드로이드: "text-accentPurple",
    PM: "text-accentColumbia",
    기획: "text-accentPink",
    마케팅: "text-accentYellow",
    백엔드: "text-accentOrange",
    디자인: "text-accentMint",
    데브옵스: "text-accentRed",
  };

  const getJobTitleClass = (job_title: string) => {
    if (!job_title) {
      return "";
    }
    const lowerJobTitle = job_title.toLowerCase();
    for (const [key, value] of Object.entries(jobTitleClassMap)) {
      if (lowerJobTitle.includes(key.toLowerCase())) {
        return value;
      }
    }
    return "";
  };

  const jobTitleClass = userData ? getJobTitleClass(userData.job_title) : "";

  useEffect(() => {
    const supabase = createClient();
    const getUserData = async () => {
      if (user) {
        const { data, error } = await supabase.from("Users").select("*").eq("user_id", user.id).limit(1).single();

        if (error) {
          console.error("Users 테이블 데이터 에러:", error);
        }

        // 데이터가 있을 경우 'userData' 상태를 업데이트
        if (data) {
          const updatedUserData = {
            id: data.user_id ?? "",
            nickname: data.nickname ?? "",
            job_title: data.job_title ?? "",
            experience: data.experience ?? "",
            profile_image_url: data.profile_image_url ?? "",
            blog: data.blog ?? "",
            description: data.description ?? "",
            background_image_url: data.background_image_url ?? "",
            answer1: data.answer1 ?? "",
            answer2: data.answer2 ?? "",
            answer3: data.answer3 ?? "",
          };
          setUserData(updatedUserData);
        }
      }
    };
    getUserData();
  }, [user]);

  return (
    <aside className="sticky top-0 p-6 s:p-0 w-[250px] max-h-[360px] flex flex-col items-start gap-3 rounded-[20px] bg-fillStrong text-fontWhite shadow-sm s:hidden">
      {loading ? (
        <LeftNavLoader />
      ) : userData ? (
        <div className="flex items-center gap-3 mb-1 pb-5 w-full border-b-[1px] border-labelAssistive">
          <div className="w-12 h-12 rounded-[12px] bg-fillLight flex justify-center items-center relative">
            <Image
              src={getProfileImageUrl(userData?.profile_image_url || defaultImage)}
              alt="프로필 이미지"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1068px) 100vw"
              style={{ objectFit: "cover" }}
              className="rounded-[12px]"
              priority
            />
          </div>
          <ol>
            <li className="font-baseBold text-labelStrong">{userData.nickname}</li>
            <li className={`text-sm ${jobTitleClass} relative`}>
              <span className="pr-2">{userData.job_title}</span>
              <span>{userData.experience}</span>
            </li>
          </ol>
        </div>
      ) : (
        <div className="text-fillStrong">사용자 정보 없음</div>
      )}
      <nav>
        <ul className="w-full">
          {/* 프로필 관리 */}
          <li className="mb-3">
            <span className="block w-full text-lg text-labelNeutral font-baseBold">프로필 관리</span>
            <ul className="ml-4 mt-2">
              <li className="mb-2">
                <Link
                  href="/mypage"
                  className={`block w-full hover:text-primary focus:text-primary ${
                    pathname === "/mypage" ? "text-primary font-baseBold" : "text-labelNeutral"
                  }`}
                >
                  기본 프로필
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/mypage/hubprofile"
                  className={`block w-full hover:text-primary focus:text-primary ${
                    pathname === "/mypage/hubprofile" ? "text-primary font-baseBold" : "text-labelNeutral"
                  }`}
                >
                  허브 프로필
                </Link>
              </li>
            </ul>
          </li>

          {/* 북마크 관리*/}
          <li className="mb-3">
            <span className="block w-full text-lg text-labelNeutral font-baseBold">북마크 관리</span>
            <ul className="ml-4 mt-2">
              <li className="mb-2">
                <Link
                  href="/mypage/myinterests"
                  className={`block w-full hover:text-primary focus:text-primary ${
                    pathname === "/mypage/myinterests" ? "text-primary font-baseBold" : "text-labelNeutral"
                  }`}
                >
                  내 관심 글
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/mypage/mypeople"
                  className={`block w-full hover:text-primary focus:text-primary ${
                    pathname === "/mypage/mypeople" ? "text-primary font-baseBold" : "text-labelNeutral"
                  }`}
                >
                  내 관심 멤버
                </Link>
              </li>
            </ul>
          </li>

          {/* 내 작성글 */}
          <li className="mb-3">
            <Link
              href="/mypage/myposts"
              className={`block w-full text-lg hover:text-primary focus:text-primary ${
                pathname === "/mypage/myposts" ? "text-primary font-baseBold" : "text-labelNeutral"
              }`}
            >
              내 작성 글
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftNav;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useUser } from "@/provider/UserContextProvider";
import { createPortal } from "react-dom";
import Link from "next/link";
// 기술 스택 목록
const techStacks = [
  { id: "aws", name: "AWS", image: "/Stacks/AWS.svg" },
  { id: "django", name: "Django", image: "/Stacks/Django.svg" },
  { id: "docker", name: "Docker", image: "/Stacks/Docker.svg" },
  { id: "express", name: "Express", image: "/Stacks/Express.svg" },
  { id: "figma", name: "Figma", image: "/Stacks/Figma.svg" },
  { id: "firebase", name: "Firebase", image: "/Stacks/Firebase.svg" },
  { id: "flutter", name: "Flutter", image: "/Stacks/Flutter.svg" },
  { id: "git", name: "Git", image: "/Stacks/Git.svg" },
  { id: "go", name: "Go", image: "/Stacks/Go.svg" },
  { id: "graphql", name: "GraphQL", image: "/Stacks/GraphQL.svg" },
  { id: "java", name: "Java", image: "/Stacks/Java.svg" },
  { id: "javascript", name: "JavaScript", image: "/Stacks/JavaScript.svg" },
  { id: "jest", name: "Jest", image: "/Stacks/Jest.svg" },
  { id: "kotlin", name: "Kotlin", image: "/Stacks/Kotlin.svg" },
  { id: "kubernetes", name: "Kubernetes", image: "/Stacks/Kubernetes.svg" },
  { id: "mongodb", name: "MongoDB", image: "/Stacks/MongoDB.svg" },
  { id: "mysql", name: "MySQL", image: "/Stacks/MySQL.svg" },
  { id: "nestjs", name: "NestJS", image: "/Stacks/Nestjs.svg" },
  { id: "nextjs", name: "NextJS", image: "/Stacks/Nextjs.svg" },
  { id: "nodejs", name: "NodeJS", image: "/Stacks/Nodejs.svg" },
  { id: "php", name: "PHP", image: "/Stacks/Php.svg" },
  { id: "python", name: "Python", image: "/Stacks/Python.svg" },
  { id: "react", name: "React", image: "/Stacks/React.svg" },
  { id: "reactnative", name: "React Native", image: "/Stacks/ReactNative.svg" },
  { id: "spring", name: "Spring", image: "/Stacks/Spring.svg" },
  { id: "svelte", name: "Svelte", image: "/Stacks/Svelte.svg" },
  { id: "swift", name: "Swift", image: "/Stacks/Swift.svg" },
  { id: "typescript", name: "TypeScript", image: "/Stacks/TypeScript.svg" },
  { id: "unity", name: "Unity", image: "/Stacks/Unity.svg" },
  { id: "vue", name: "Vue", image: "/Stacks/Vue.svg" },
  { id: "zeplin", name: "Zeplin", image: "/Stacks/Zeplin.svg" },
];
// fetchMembers 함수 정의
const fetchMembers = async ({ pageParam = 1 }) => {
  const response = await fetch(`/api/gatherHub?page=${pageParam}&limit=10`);
  const data = await response.json();

  return {
    members: data.members,
    nextPage: data.members.length === 10 ? pageParam + 1 : undefined,
  };
};

// MemberCardProps: 멤버 카드 컴포넌트에서 필요한 속성들을 정의하는 인터페이스
interface MemberCardProps {
  id: string;
  nickname: string;
  job_title: string;
  experience: string;
  description: string;
  profile_image_url: string;
  blog: string; // 대표 포트폴리오
  background_image_url: string;
  first_link_type: string; // 첫 번째 링크 타입
  first_link: string; // 첫 번째 링크
  second_link_type: string; // 두 번째 링크 타입
  second_link: string; // 두 번째 링크
  tech_stacks: string[]; // 기술 스택
  liked: boolean;
  toggleLike: (nickname: string) => void;
  answer1: string;
  answer2: string;
  answer3: string;
}

// MemberCard: 각 멤버의 정보를 카드 형태로 렌더링하는 컴포넌트
const MemberCard: React.FC<MemberCardProps> = ({
  id,
  nickname,
  job_title,
  experience,
  description,
  profile_image_url,
  background_image_url,
  blog,
  first_link_type,
  first_link,
  second_link_type,
  second_link,
  answer1,
  answer2,
  answer3,
  tech_stacks,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { likedMembers, toggleLike } = useUser();
  const liked = likedMembers[nickname] || false;

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 선택된 기술 스택 필터링
  const selectedTechStacks = useMemo(() => {
    return techStacks.filter((stack) => (tech_stacks || []).includes(stack.id));
  }, [tech_stacks]);

  return (
    <>
      <div
        className="w-[340px] h-65 p-5 bg-[#141415] rounded-3xl flex-col justify-between items-center inline-flex"
        style={{ userSelect: "none" }}
      >
        <div className="self-stretch grow shrink basis-0 rounded-3xl flex-col justify-between items-start flex">
          {/* 상단 프로필 섹션 */}
          <div className="self-stretch justify-between items-start inline-flex">
            <div className="justify-start items-center gap-3 flex">
              {/* 프로필 이미지 */}
              <div className="relative w-20 h-20">
                <Image
                  src={profile_image_url}
                  alt={nickname}
                  fill
                  sizes="20vw"
                  className="object-cover rounded-2xl shadow-lg"
                  priority
                />
              </div>

              {/* 멤버정보 */}
              <div
                className="flex-col justify-start items-start ml-2 gap-2 inline-flex cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                onClick={openModal}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                <div className="text-center text-[#f7f7f7] text-lg font-medium font-['Pretendard'] leading-[25.20px]">
                  {nickname.length > 9 ? `${nickname.slice(0, 9)}...` : nickname}
                </div>
                <div className="self-stretch justify-start items-center gap-3 inline-flex">
                  <div className="justify-start items-center gap-2 flex">
                    <div className="text-[#a0e7b8] text-sm font-normal font-['Pretendard'] leading-[21px]">
                      {job_title}
                    </div>
                  </div>
                  <div className="w-px self-stretch bg-[#28282a] rounded-[999px]"></div>
                  <div className="text-[#5e5e5e] text-sm font-normal font-['Pretendard'] leading-[21px] whitespace-nowrap">
                    {experience}
                  </div>
                </div>
              </div>
            </div>

            {/* 북마크 */}
            <div
              className="member-card bg-fillStrong rounded-[20px] shadow-lg relative w-[276px] h-2 flex-col z-30 user-select-none justify-start items-center inline-flex"
              style={{ userSelect: "none" }}
            >
              <div className="absolute top-1 right-1 z-10 justify-center items-center gap-2.5 flex">
                <button
                  onClick={() => toggleLike(nickname)}
                  className="p-1 rounded-[9px] bg-[#141415] border border-[#2d2d2f] shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-110"
                  style={{ userSelect: "none" }}
                >
                  <Image
                    src={liked ? "/assets/bookmark2.svg" : "/assets/bookmark1.svg"}
                    alt="좋아요"
                    width={6}
                    height={6}
                    className="w-6 h-6 p-1"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 자기소개 */}
          <div
            className="self-stretch h-[41px] flex-col mt-3 justify-center items-end flex cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={openModal}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            <div className="self-stretch h-[41px] text-[#919191] text-sm font-normal font-['Pretendard'] leading-[21px]">
              {description.length > 20 ? `${description.slice(0, 20)}...` : description}
            </div>
          </div>

          {/* 포트폴리오 및 소셜 링크 */}
          <div className="self-stretch justify-start items-center mb-3 gap-2 inline-flex">
            {/* blog 링크 */}
            {blog && (
              <div className="p-1 bg-[#28282a] rounded-[9px] justify-center items-center gap-2.5 flex">
                <div className="w-6 h-6 p-1 justify-center items-center flex">
                  <Link
                    href={blog}
                    target="_blank"
                    className="flex flex-col items-center space-y-1 transition-transform duration-300 hover:scale-110 hover:rotate-3"
                    style={{ userSelect: "none" }}
                  >
                    <Image
                      src="/Link/link.svg" // blog는 기본적으로 link.svg 아이콘 사용
                      alt="포트폴리오"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </Link>
                </div>
              </div>
            )}

            {/* 첫 번째 링크 */}
            {first_link && (
              <div className="p-1 bg-[#28282a] rounded-[9px] justify-center items-center gap-2.5 flex">
                <div className="w-6 h-6 p-1 justify-center items-center flex">
                  <Link
                    href={first_link}
                    target="_blank"
                    className="flex flex-col items-center space-y-1 transition-transform duration-300 hover:scale-110 hover:rotate-3"
                    style={{ userSelect: "none" }}
                  >
                    <Image
                      src={first_link_type ? `/Link/${first_link_type}.svg` : "/Link/link.svg"} // firstLinkType에 따른 아이콘
                      alt="첫 번째 링크"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </Link>
                </div>
              </div>
            )}

            {/* 두 번째 링크 */}
            {second_link && (
              <div className="p-1 bg-[#28282a] rounded-[9px] justify-center items-center gap-2.5 flex">
                <div className="w-6 h-6 p-1 justify-center items-center flex">
                  <Link
                    href={second_link}
                    target="_blank"
                    className="flex flex-col items-center space-y-1 transition-transform duration-300 hover:scale-110 hover:rotate-3"
                    style={{ userSelect: "none" }}
                  >
                    <Image
                      src={second_link_type ? `/Link/${second_link_type}.svg` : "/Link/link.svg"} // secondLinkType에 따른 아이콘
                      alt="두 번째 링크"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
          {/* 버튼영역 */}
          <div
            className="w-[300px] h-[45px] px-4 py-2 bg-[#212121] hover:bg-gray-900 rounded-xl justify-center items-center gap-2 inline-flex"
            style={{ cursor: "not-allowed" }}
          >
            <button
              className="relative text-white py-3 rounded-xl transition flex items-center space-x-2 group"
              style={{ userSelect: "none", cursor: "not-allowed" }}
              disabled
            >
              <Image src="/assets/chat.svg" alt="메시지 아이콘" width={20} height={20} className="w-5 h-5" />
              <span className="hidden md:block">대화 시작하기</span>

              {/* 말풍선 */}
              <div className="absolute top-[-60px] right-[-150px] transform -translate-x-1/2 min-w-[140px] px-3 py-2 bg-[orange] text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                현재 개발 중인 <br /> 기능 입니다.
                <div className="absolute bottom-[-6px] right-[30px] transform -translate-x-1/2 w-3 h-3 bg-[orange] rotate-45"></div>
              </div>
            </button>
          </div>
        </div>

        {/* 모달 창 */}
        {isModalOpen &&
          createPortal(
            <div
              className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
              onClick={closeModal}
              style={{ userSelect: "none" }}
            >
              <div
                className="bg-[#141415] rounded-3xl shadow-lg s:w-[400px] s:h-[600px] w-[744px] h-[800px] overflow-y-auto transform transition-transform duration-300 ease-in-out scale-95 opacity-0"
                style={{
                  opacity: isModalOpen ? 1 : 0,
                  transform: isModalOpen ? "scale(1)" : "scale(0.95)",
                  userSelect: "none",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-[#1919a] text-3xl font-bold rounded-full p-4 hover:text-black hover:scale-110 transition-transform duration-200 ease-in-out z-50"
                  onClick={closeModal}
                  style={{ userSelect: "none" }}
                >
                  &times;
                </button>
                {/* 대표 포트폴리오 이미지 */}
                <div
                  className="relative h-[300px] bg-gray-200 rounded-t-[20px] overflow-hidden cursor-pointer"
                  onClick={() => window.open(blog, "_blank")}
                  style={{ userSelect: "none" }}
                >
                  {background_image_url ? (
                    <Image
                      src={background_image_url}
                      alt="배경 이미지"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  ) : (
                    <Image
                      src="/logos/hi.png"
                      alt="기본 이미지"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  )}
                </div>

                {/* 프로필 정보 */}
                <div className="relative">
                  <div className="absolute -top-20 flex flex-col items-start p-6">
                    <div className="w-[120px] h-[120px] rounded-2xl bg-white border-1 border-background overflow-hidden">
                      <div className="relative w-[120px] h-[120px]">
                        <Image
                          src={profile_image_url}
                          alt={nickname}
                          fill
                          sizes="24vw"
                          className="object-cover rounded-2xl shadow-lg"
                          priority
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <h2 className="text-xl font-medium text-f7f7f7 font-['Pretendard'] leading-7">{nickname}</h2>
                      <p className="text-primary mt-1 text-sm font-normal font-['Pretendard'] leading-[21px]">
                        {job_title}
                        <span className="text-[#5e5e5e] text-sm font-normal font-['Pretendard'] leading-[21px]">
                          &nbsp; |&nbsp; {experience}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* 좋아요 & 1:1채팅 버튼 */}
                  <div className="absolute -top-10 right-0 flex items-center space-x-4 p-6">
                    <button
                      onClick={() => toggleLike(nickname)}
                      className={`p-3 rounded-xl transition flex items-center space-x-2 ${
                        liked ? "bg-gray-800 text-white" : "bg-[#28282a] text-white"
                      } hover:bg-gray-900`}
                      style={{ userSelect: "none" }}
                    >
                      <Image
                        src={liked ? "/assets/bookmark2.svg" : "/assets/bookmark1.svg"}
                        alt="북마크"
                        width={5}
                        height={5}
                        className="w-5 h-5"
                      />
                      <span className={`hidden md:block`}>북마크 저장하기</span>
                    </button>

                    <button
                      className="bg-[#28282a] text-white px-4 py-3 rounded-xl hover:bg-gray-900 transition flex items-center space-x-2 group"
                      style={{ userSelect: "none", cursor: "not-allowed" }}
                      disabled
                    >
                      <Image src="/assets/chat.svg" alt="메시지 아이콘" width={20} height={20} className="w-5 h-5" />
                      <span className="hidden md:block">대화 신청하기</span>

                      {/* 말풍선 */}
                      <div className="absolute top-[100%] s:left-[50%] left-[65%] transform -translate-x-1/2 min-w-[140px] px-3 py-2 bg-[orange] text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        현재 개발 중인 <br /> 기능 입니다.
                        <div className="absolute top-[-6px] s:left-[70%] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[orange] rotate-45"></div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="s:w-[340px] w-[680px] border-t border-gray-500 border-opacity-40 mt-40 mx-5"></div>

                {/* 자기소개 섹션 */}
                <div className="h-[92px] justify-start p-6 items-start gap-5 inline-flex space-x-8 md:space-x-20">
                  <div className="h-[29px] p-1 justify-start items-center gap-1 flex">
                    <div className="text-[#c4c4c4] text-sm font-medium font-['Pretendard'] leading-[21px]">
                      자기소개
                    </div>
                  </div>
                  <div className="s:w-[240px] md:w-[524px] flex-col justify-start items-start inline-flex">
                    <div className="self-stretch h-[92px] py-1 flex-col justify-center items-center flex">
                      <div className="self-stretch h-[84px] p-3 bg-[#19191a] rounded-xl shadow border border-[#212121] justify-between items-start inline-flex">
                        <div className="text-xs md:text-sm text-gray-300 md:h-auto h-[60px] overflow-y-auto md:overflow-y-visible leading-relaxed md:leading-normal">
                          {description}
                        </div>
                        <div className="w-6 h-6 p-1 justify-center items-center flex">
                          <div className="h-4 p-2.5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="s:w-[340px] w-[680px] border-t border-gray-500 border-opacity-40 mx-5"
                  style={{ marginTop: "50px" }}
                ></div>

                <div className="h-[411px] justify-start p-6 items-start gap-5 inline-flex space-x-6 md:space-x-16">
                  <div className="h-[29px] p-2 justify-start items-center gap-1 flex">
                    <div className="text-[#c4c4c4] text-sm font-medium font-['Pretendard'] leading-[21px] whitespace-nowrap">
                      공통 질문
                    </div>
                  </div>

                  <div className="s:w-[240px] md:w-[524px] flex-col justify-start items-start gap-6 inline-flex">
                    <div className="self-stretch h-[121px] flex-col justify-start items-start flex">
                      <div className="self-stretch p-1 justify-start items-center gap-2 inline-flex">
                        <div className="text-[#c4c4c4] s:text-xs text-sm font-medium font-['Pretendard'] leading-[21px]">
                          1. 팀으로 일할 때 나는 어떤 팀원인지 설명해 주세요.
                        </div>
                      </div>
                      <div className="self-stretch h-[92px] py-1 flex-col justify-center items-center flex">
                        <div className="self-stretch h-[84px] p-3 bg-[#19191a] rounded-xl shadow border border-[#212121] justify-between items-start inline-flex">
                          <div className="text-xs md:text-sm text-gray-300 md:h-auto h-[60px] overflow-y-auto md:overflow-y-visible leading-relaxed md:leading-normal">
                            {answer1}
                          </div>
                          <div className="w-6 h-6 p-1 justify-center items-center flex">
                            <div className="h-4 p-2.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="self-stretch h-[121px] flex-col justify-start items-start flex">
                      <div className="self-stretch p-1 justify-start items-center gap-2 inline-flex">
                        <div className="text-[#c4c4c4] s:text-xs text-sm font-medium font-['Pretendard'] leading-[21px]">
                          2. 팀과 함께 목표를 이루기 위해 무엇이 가장 중요하다고 생각하는지 알려 주세요.
                        </div>
                      </div>
                      <div className="self-stretch h-[92px] py-1 flex-col justify-center items-center flex">
                        <div className="self-stretch h-[84px] p-3 bg-[#19191a] rounded-xl shadow border border-[#212121] justify-between items-start inline-flex">
                          <div className="text-xs md:text-sm text-gray-300 md:h-auto h-[60px] overflow-y-auto md:overflow-y-visible leading-relaxed md:leading-normal">
                            {answer2}
                          </div>
                          <div className="w-6 h-6 p-1 justify-center items-center flex">
                            <div className="h-4 p-2.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="self-stretch h-[121px] flex-col justify-start items-start flex">
                      <div className="self-stretch p-1 justify-start items-center gap-2 inline-flex">
                        <div className="text-[#c4c4c4] s:text-xs text-sm font-medium font-['Pretendard'] leading-[21px]">
                          3. 자신이 부족하다고 느낀 부분을 어떻게 보완하거나 학습해왔는지 이야기해 주세요.
                        </div>
                      </div>
                      <div className="self-stretch h-[92px] py-1 flex-col justify-center items-center flex">
                        <div className="self-stretch h-[84px] p-3 bg-[#19191a] rounded-xl shadow border border-[#212121] justify-between items-start inline-flex">
                          <div className="text-xs md:text-sm text-gray-300 md:h-auto h-[60px] overflow-y-auto md:overflow-y-visible leading-relaxed md:leading-normal">
                            {answer3}
                          </div>
                          <div className="w-6 h-6 p-1 justify-center items-center flex">
                            <div className="h-4 p-2.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="s:w-[340px] w-[680px] border-t border-gray-500 border-opacity-40 s:mt-[90px] mt-[54px] mx-5"></div>

                <div className="h-8 justify-start items-start p-6 gap-5 inline-flex space-x-20">
                  <div className="h-[29px] p-1 justify-start items-center gap-1 flex">
                    <div className="text-[#c4c4c4] text-sm font-medium font-['Pretendard'] leading-[21px]">
                      기술 스택
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedTechStacks.map((stack) => (
                      <div
                        key={stack.id}
                        className="px-3 py-2 bg-[#28282a] rounded-full border border-[#2d2d2f] flex items-center gap-2"
                      >
                        <Image src={stack.image} alt={stack.name} width={12} height={12} />
                        <span className="text-white text-xs font-medium">{stack.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="w-240px border-t border-gray-500 border-opacity-40 mx-5"
                  style={{ marginTop: "50px" }}
                ></div>

                <div className="h-9 justify-start items-start gap-5 inline-flex p-6 space-x-20">
                  <div className="h-[29px] p-1 justify-start items-center gap-1 flex">
                    <div className="w-[52px] text-[#c4c4c4] text-sm font-medium font-['Pretendard'] leading-[21px]">
                      URL
                    </div>
                  </div>

                  <div className="grow shrink basis-0 h-9 justify-start items-center gap-2 flex">
                    {/* Blog 링크 */}
                    <div className="p-1 bg-[#28282a] rounded-[10px] border border-[#2d2d2f] justify-center items-center gap-2.5 flex">
                      <Link href={blog || "#"} target="_blank" className="flex justify-center items-center">
                        <Image src="/Link/link.svg" alt="Blog Link" width={24} height={24} className="w-7 h-7" />
                      </Link>
                    </div>

                    {/* 첫 번째 링크 */}
                    {first_link && (
                      <div className="p-1 bg-[#28282a] rounded-[10px] border border-[#2d2d2f] justify-center items-center gap-2.5 flex">
                        <Link href={first_link || "#"} target="_blank" className="flex justify-center items-center">
                          <Image
                            src={`/Link/${first_link_type}.svg`} // first_link_type에 맞는 아이콘 표시
                            alt={`${first_link_type} Link`}
                            width={24}
                            height={24}
                            className="w-7 h-7"
                          />
                        </Link>
                      </div>
                    )}
                    {/* 두 번째 링크 */}
                    {second_link && (
                      <div className="p-1 bg-[#28282a] rounded-[10px] border border-[#2d2d2f] justify-center items-center gap-2.5 flex">
                        <Link href={second_link || "#"} target="_blank" className="flex justify-center items-center">
                          <Image
                            src={`/Link/${second_link_type}.svg`} // second_link_type에 맞는 아이콘 표시
                            alt={`${second_link_type} Link`}
                            width={24}
                            height={24}
                            className="w-7 h-7"
                          />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="w-240px border-t border-gray-500 border-opacity-10 mx-5"
                  style={{ marginTop: "50px" }}
                ></div>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </>
  );
};

const PrCard: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  const [slides, setSlides] = useState<any[]>([]);

  const { data, isLoading, isError } = useInfiniteQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (data) {
      const latestMembers = data.pages.flatMap((page) => page.members).slice(0, 10);
      setSlides(latestMembers);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data...</p>;

  return (
    <div className="w-auto h-auto rounded-2xl my-3" style={{ marginTop: "-10px" }}>
      <h4 className="flex items-center my-3 text-labelNormal">
        <Image src="/assets/gif/mic.gif" alt="마이크 모양 아이콘" width={20} height={20} className="mr-1" />
        자랑스러운 게더_멤버들을 소개할게요
      </h4>
      <Slider {...settings}>
        {slides.map((member, index) => (
          <div key={index}>
            <MemberCard
              id={member.id}
              nickname={member.nickname}
              job_title={member.job_title}
              experience={member.experience}
              description={member.description}
              profile_image_url={member.profile_image_url}
              background_image_url={member.background_image_url}
              blog={member.blog}
              first_link_type={member.first_link_type} // first_link_type 전달
              first_link={member.first_link} // first_link 전달
              second_link_type={member.second_link_type} // second_link_type 전달
              second_link={member.second_link} // second_link 전달
              liked={false} // liked 값 설정
              answer1={member.answer1}
              answer2={member.answer2}
              answer3={member.answer3}
              toggleLike={() => {}}
              tech_stacks={member.tech_stacks || []} // 각 멤버의 tech_stacks 전달
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PrCard;

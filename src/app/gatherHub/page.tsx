"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import MemberCard from "@/components/GatherHub/MemberCard";
import JobDirectory from "@/components/GatherHub/JobDirectory";
import { useUser } from "@/provider/UserContextProvider";
import { useInfiniteQuery } from "@tanstack/react-query";
import { throttle } from "lodash";
import { createClient } from "@/utils/supabase/client";

// 멤버 카드의 인터페이스 정의
interface MemberCardProps {
  id: string;
  nickname: string;
  job_title: string;
  experience: string;
  background_image_url: string;
  profile_image_url: string;
  blog: string;
  notionLink: string;
  instagramLink: string;
  liked: boolean;
  description: string;
  answer1: string;
  answer2: string;
  answer3: string;
}

const supabase = createClient();

// 필터링 로직을 함수로 분리
const filterMembers = (members: MemberCardProps[], job: string) => {
  return job === "all"
    ? members.filter((member) => member.nickname && member.job_title && member.profile_image_url)
    : members.filter(
        (member) => member.job_title?.toLowerCase() === job && member.nickname && member.profile_image_url,
      );
};

// 유저 데이터를 페이지네이션으로 가져오는 함수
const fetchMembers = async ({ pageParam = 1 }) => {
  const response = await fetch(`/api/gatherHub?page=${pageParam}&limit=10`);
  const data = await response.json();

  return {
    members: data.members,
    nextPage: data.members.length === 10 ? pageParam + 1 : undefined,
  };
};

const GatherHubPage: React.FC = () => {
  const { userData } = useUser(); // 사용자 데이터를 전역적으로 관리하기 위해 UserContext를 사용
  const isHubRegistered = userData?.hubCard || false; // 사용자가 hubCard를 등록했는지 확인
  const [filteredJob, setFilteredJob] = useState<string>("all"); // 직업별 필터링 상태 관리
  const [hasNextPageState, setHasNextPageState] = useState<boolean>(true);
  const [isFetchingNextPageState, setIsFetchingNextPageState] = useState<boolean>(false);

  // 무한 스크롤을 관리하기 위한 useInfiniteQuery 사용
  const {
    data, // 서버에서 가져온 데이터
    fetchNextPage, // 다음 페이지 로드 함수
    hasNextPage, // 다음 페이지가 있는지 여부
    isLoading,
    isFetchingNextPage, // 다음 페이지를 로드 중인지 여부
    isError,
    refetch, // 에러 발생 시 다시 시도할 수 있게 사용
  } = useInfiniteQuery({
    queryKey: ["members"],
    queryFn: fetchMembers, // 데이터를 가져오는 함수
    getNextPageParam: (lastPage) => lastPage.nextPage, // nextPage가 undefined이면 자동으로 중단
    staleTime: 60000, // 1분간 데이터 캐싱
    initialPageParam: 1, // 초기 페이지 파라미터
  });

  // 상태를 업데이트하여 스크롤에 따라 fetchNextPage를 제어
  useEffect(() => {
    setHasNextPageState(hasNextPage || false); // `hasNextPage`가 `undefined`이면 `false`로 설정
    setIsFetchingNextPageState(isFetchingNextPage || false);
  }, [hasNextPage, isFetchingNextPage]);

  const handleCardClick = (member: MemberCardProps) => {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString()); // 카드 클릭 시 현재 스크롤 위치를 세션 스토리지에 저장
  };

  useEffect(() => {
    const savedPosition = sessionStorage.getItem("scrollPosition"); // 세션 스토리지에서 'scrollPosition' 키로 저장된 값을 가져옴
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }, []);

  useEffect(() => {
    setHasNextPageState(hasNextPage || false);
    setIsFetchingNextPageState(isFetchingNextPage || false);
  }, [hasNextPage, isFetchingNextPage]);

  // 필터링이 변경될 때마다 스크롤을 맨 위로 즉시 이동
  useEffect(() => {
    if (filteredJob !== "all") {
      window.scrollTo(0, 0); // 필터가 변경될 때 스크롤을 맨 위로 이동
    }
  }, [filteredJob]);

  // 무한 스크롤 로직
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (
        hasNextPage &&
        !isFetchingNextPage &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      ) {
        fetchNextPage();
      }
    }, 500);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 좋아요 상태 관리
  const [likedMembers, setLikedMembers] = useState<{ [key: string]: boolean }>({});

  // 좋아요 상태를 변경하는 함수
  const toggleLike = useCallback(
    async (nickname: string) => {
      const isLiked = likedMembers[nickname] || false;

      // 닉네임을 통해 해당 멤버의 ID를 가져옴
      const { data: user, error: userError } = await supabase
        .from("Users")
        .select("user_id")
        .eq("nickname", nickname)
        .single();

      if (userError || !user?.user_id) {
        console.error("유저를 찾는 중 오류 발생:", userError);
        return;
      }

      const likedUserId = user.user_id;

      // 현재 로그인한 사용자의 ID를 가져옴
      const currentUserId = userData?.id; // userData가 null일 수 있으므로 안전하게 접근

      if (!currentUserId) {
        console.error("로그인된 사용자 ID를 찾을 수 없습니다.");
        return;
      }

      if (!isLiked) {
        // 좋아요 추가
        const { error: insertError } = await supabase
          .from("User_Interests")
          .insert([{ user_id: currentUserId, liked_user_id: likedUserId, created_at: new Date().toISOString() }]);

        if (insertError) {
          console.error("좋아요 추가 중 오류 발생:", insertError);
          return;
        }

        // 상태 업데이트
        setLikedMembers((prev) => ({
          ...prev,
          [nickname]: true,
        }));
      } else {
        // 좋아요 삭제
        const { error: deleteError } = await supabase
          .from("User_Interests")
          .delete()
          .eq("user_id", currentUserId)
          .eq("liked_user_id", likedUserId);

        if (deleteError) {
          console.error("좋아요 삭제 중 오류 발생:", deleteError);
          return;
        }

        // 상태 업데이트
        setLikedMembers((prev) => ({
          ...prev,
          [nickname]: false,
        }));
      }
    },
    [likedMembers, supabase, userData?.id], // userData.id가 null일 수 있으므로 ?.로 안전하게 접근
  );

  // 사용자와 서버 멤버 데이터를 결합하여 allMembers 생성
  const allMembers = useMemo(() => {
    const userMember =
      isHubRegistered && userData
        ? [
            {
              nickname: userData.nickname || "",
              job_title: userData.job_title || "",
              experience: userData.experience || "",
              blog: userData.blog || "",
              description: userData.description || "항상 사용자의 입장에서 친절한 화면을 지향합니다.",
              background_image_url: "",
              profile_image_url: userData.profile_image_url || "",
              answer1: userData.answer1 || "기본 답변 1",
              answer2: userData.answer2 || "기본 답변 2",
              answer3: userData.answer3 || "기본 답변 3",
              notionLink: "https://www.notion.so/",
              instagramLink: "https://www.instagram.com/",
              liked: likedMembers[userData.nickname || ""] || false, // 좋아요 상태
              toggleLike: toggleLike, // 좋아요 상태 변경 함수 전달
            },
          ]
        : [];

    // 서버에서 가져온 멤버 데이터를 포함하여 전체 멤버 목록을 반환
    const serverMembers = data?.pages.flatMap((page) => page.members) || [];

    // 중복된 멤버 제거 (닉네임 기준으로 중복 체크)
    const uniqueMembers = Array.from(new Set([...userMember, ...serverMembers].map((m) => m.nickname))).map(
      (nickname) => {
        return [...userMember, ...serverMembers].find((member) => member.nickname === nickname);
      },
    );

    return uniqueMembers;
  }, [isHubRegistered, userData, data, likedMembers]);

  // 필터링된 멤버 데이터를 반환하는 함수
  const filteredMembers = useMemo(() => filterMembers(allMembers, filteredJob), [allMembers, filteredJob]);

  // 로딩 중 상태 처리
  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">Loading....</div>;
  }

  // 에러 발생 시 처리
  if (isError) {
    return (
      <div className="text-center text-red-500">
        서버 오류: 데이터를 로드 중 문제가 발생했습니다.
        <button onClick={() => refetch()} className="bg-red-500 text-white p-2 rounded-md mt-4">
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center">
      <div className="w-full lg:max-w-6xl lg:flex lg:justify-between px-4 py-8">
        {/* 작은 화면에서 JobDirectory */}
        <div className="mb-6 lg:hidden">
          <JobDirectory setFilteredJob={setFilteredJob} className="w-full" />
        </div>

        {/* Member Cards */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ml-8 justify-items-center">
          {filteredMembers.map((member, index) => (
            <div key={`${member.nickname}-${index}`} onClick={() => handleCardClick(member)}>
              {" "}
              {/* 각 멤버 카드 클릭 시 handleCardClick 함수가 호출되어 스크롤 위치 저장 */}
              <MemberCard
                tech_stacks={[]}
                first_link_type={""}
                first_link={""}
                second_link_type={""}
                second_link={""}
                {...member} // member 객체의 모든 속성을 MemberCard 컴포넌트로 전달
                liked={likedMembers[member.nickname] || false} // 좋아요 상태를 liked 속성으로 전달
                toggleLike={() => toggleLike(member.nickname)}
              />
            </div>
          ))}
          {isFetchingNextPage && <div className="col-span-full">더 불러오는 중...</div>}
          {!hasNextPage && filteredMembers.length > 0 && (
            <div className="col-span-full text-center">모든 데이터를 불러왔습니다.</div>
          )}
          {filteredMembers.length === 0 && !isLoading && (
            <div className="col-span-full text-center">표시할 데이터가 없습니다.</div>
          )}
        </div>

        {/* 큰 화면에서 JobDirectory */}
        <div className="hidden lg:block lg:ml-10 lg:w-40 mt-[-5px]">
          <JobDirectory setFilteredJob={setFilteredJob} />
        </div>
      </div>
    </div>
  );
};

export default GatherHubPage;

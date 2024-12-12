"use client";
import { useUser } from "@/provider/UserContextProvider";
import MemberCard from "@/components/GatherHub/MemberCard";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// MyPeoplePage 컴포넌트
const MyPeoplePage: React.FC = () => {
  const { userData } = useUser(); // 로그인한 사용자 데이터 가져오기
  const supabase = createClient(); // Supabase 클라이언트 생성
  const [likedMembers, setLikedMembers] = useState<any[]>([]); // 좋아요한 멤버들 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    // 좋아요한 멤버를 가져오는 함수
    const fetchLikedMembers = async () => {
      if (!userData?.id) {
        console.log("userData가 존재하지 않음");
        setLoading(false); // userData가 없으면 로딩 중지
        return;
      }

      console.log("userData가 존재:", userData);
      setLoading(true); // 로딩 시작
      setError(null); // 이전 에러 초기화

      try {
        console.log("좋아요한 멤버 ID 가져오기 시작...");
        // User_Interests 테이블에서 현재 사용자가 좋아요한 유저 ID들을 가져옴
        const { data: interestsData, error: interestsError } = await supabase
          .from("User_Interests")
          .select("liked_user_id")
          .eq("user_id", userData.id);

        if (interestsError) {
          console.error("좋아요한 멤버 ID를 불러오는 중 오류 발생:", interestsError.message);
          setError("좋아요한 멤버를 불러오는 중 오류가 발생했습니다.");
          setLoading(false); // 에러 발생 시 로딩 중지
          return;
        }

        if (!interestsData || interestsData.length === 0) {
          console.log("관심 멤버가 없음");
          setLikedMembers([]); // 관심 멤버가 없을 경우 빈 배열로 설정
          setLoading(false); // 로딩 중지
          return;
        }

        console.log("좋아요한 멤버 ID 가져오기 성공:", interestsData);

        // 좋아요한 유저 ID들을 이용해 Users 테이블에서 해당 멤버들의 정보 가져오기
        const likedUserIds = interestsData.map((interest) => interest.liked_user_id);
        const { data: likedMembersData, error: membersError } = await supabase
          .from("Users")
          .select("*")
          .in("user_id", likedUserIds);

        if (membersError) {
          console.error("좋아요한 멤버 정보를 불러오는 중 오류 발생:", membersError.message);
          setError("멤버 정보를 불러오는 중 오류가 발생했습니다.");
        } else {
          console.log("좋아요한 멤버 정보 가져오기 성공:", likedMembersData);
          setLikedMembers(likedMembersData || []); // 멤버 정보가 없으면 빈 배열로 설정
        }
      } catch (error) {
        console.error("데이터 불러오는 중 오류 발생:", error);
        setError("데이터 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    if (userData) {
      fetchLikedMembers(); // userData가 준비된 후 함수 호출
    } else {
      console.log("userData가 없음");
      setLoading(false); // userData가 없을 때 로딩 중지
    }
  }, [userData, supabase]);

  return (
    <div className="my-people-page">
      <h1 className="text-xl font-bold mb-6">내 관심 멤버</h1>

      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p> // 에러 메시지 표시
      ) : likedMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedMembers.map((member) => (
            <MemberCard
              key={member.user_id}
              nickname={member.nickname}
              job_title={member.job_title}
              experience={member.experience}
              description={member.description}
              background_image_url={member.background_image_url}
              profile_image_url={member.profile_image_url}
              blog={member.blog}
              answer1={member.answer1}
              answer2={member.answer2}
              answer3={member.answer3}
              first_link={member.first_link} // 첫 번째 링크
              first_link_type={member.first_link_type} // 첫 번째 링크 타입
              second_link={member.second_link} // 두 번째 링크
              second_link_type={member.second_link_type} // 두 번째 링크 타입
              liked={true} // 이미 좋아요한 멤버
              toggleLike={() => {}} // 좋아요 토글 기능은 여기서는 사용하지 않음
              tech_stacks={[]}
            />
          ))}
        </div>
      ) : (
        <p>준비중입니다! 조금만 기다려주세요!</p>
      )}
    </div>
  );
};

export default MyPeoplePage;

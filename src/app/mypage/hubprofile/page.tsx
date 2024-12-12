"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/provider/UserContextProvider";
import SelfIntroduction from "@/components/MyPage/HubInfo/Introductioin";
import HubProfileForm from "@/components/MyPage/HubInfo/HubProfileInfo";
import TeamworkQuestions from "@/components/MyPage/HubInfo/TeamQuestions";
import BackgroundPicture from "@/components/MyPage/HubInfo/BackgroundPicture";
import Toast from "@/components/Common/Toast/Toast";
import TechStack from "@/components/MyPage/HubInfo/TechStack"; // TechStack 추가

const HubProfile: React.FC = () => {
  const supabase = createClient();
  const { user, fetchUserData } = useUser();

  // 상태 정의
  const [description, setDescription] = useState("");
  const [blog, setBlog] = useState("");
  const [firstLinkType, setFirstLinkType] = useState("");
  const [firstLink, setFirstLink] = useState("");
  const [secondLinkType, setSecondLinkType] = useState("");
  const [secondLink, setSecondLink] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [techStacks, setTechStacks] = useState<string[]>([]); // TechStack 상태 추가
  const [toastState, setToastState] = useState({ state: "", message: "" });

  // 페이지가 로드될 때 데이터베이스에서 값을 가져오는 useEffect
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("Users")
        .select(
          "description, blog, first_link_type, first_link, second_link_type, second_link, answer1, answer2, answer3, tech_stacks",
        )
        .eq("user_id", user.id)
        .single(); // 사용자의 모든 데이터를 가져옴

      if (data) {
        // 각 필드에 저장된 값을 상태로 설정
        setDescription(data.description || "");
        setBlog(data.blog || "");
        setFirstLinkType(data.first_link_type || "");
        setFirstLink(data.first_link || "");
        setSecondLinkType(data.second_link_type || "");
        setSecondLink(data.second_link || "");
        setAnswer1(data.answer1 || "");
        setAnswer2(data.answer2 || "");
        setAnswer3(data.answer3 || "");
        setTechStacks(data.tech_stacks || []); // TechStack 상태 설정
      }

      if (error) {
        console.error("사용자 데이터를 가져오지 못했습니다:", error);
      }
    };

    fetchUserProfile();
  }, [user]);

  // 저장 버튼을 눌렀을 때 모든 데이터를 한 번에 저장하는 함수
  const handleSave = async () => {
    if (!blog) {
      // 포트폴리오 링크가 비어 있을 때 토스트 메시지 출력
      setToastState({ state: "error", message: "포트폴리오 링크를 작성해주세요!" });
      return;
    }

    if (!user) return;

    const { error } = await supabase
      .from("Users")
      .update({
        hubCard: true,
        description,
        blog,
        first_link_type: firstLinkType,
        first_link: firstLink,
        second_link_type: secondLinkType,
        second_link: secondLink,
        answer1,
        answer2,
        answer3,
        tech_stacks: techStacks, // TechStack 저장
      })
      .eq("user_id", user.id);

    if (error) {
      setToastState({ state: "error", message: "저장에 실패했습니다." });
    } else {
      setToastState({ state: "success", message: "저장되었습니다." });
      fetchUserData(); // 업데이트 후 사용자 데이터 다시 불러오기
    }
  };

  return (
    <section>
      <BackgroundPicture />

      {/* 보더 적용 */}
      <div className="border-b-[1px] border-fillNormal my-6" />

      <SelfIntroduction description={description} setDescription={setDescription} />
      {/* 보더 적용 */}
      <div className="border-b-[1px] border-fillNormal my-6" />

      <TeamworkQuestions
        answer1={answer1}
        setAnswer1={setAnswer1}
        answer2={answer2}
        setAnswer2={setAnswer2}
        answer3={answer3}
        setAnswer3={setAnswer3}
      />
      {/* 보더 적용 */}
      <div className="border-b-[1px] border-fillNormal my-6" />

      <TechStack selectedStacks={techStacks} setSelectedStacks={setTechStacks} />

      {/* 보더 적용 */}
      <div className="border-t border-labelAssistive my-6" />

      <HubProfileForm
        blog={blog}
        setBlog={setBlog}
        firstLinkType={firstLinkType}
        setFirstLinkType={setFirstLinkType}
        firstLink={firstLink}
        setFirstLink={setFirstLink}
        secondLinkType={secondLinkType}
        setSecondLinkType={setSecondLinkType}
        secondLink={secondLink}
        setSecondLink={setSecondLink}
      />

      <div className="border-b-[1px] border-fillNormal my-6" />

      {/* 저장 버튼 */}
      <div className="mt-6 mb-12">
        <div className="flex justify-center">
          <button onClick={handleSave} aria-label="저장" className="shared-button-green w-[65px]">
            저장
          </button>
        </div>
      </div>

      {toastState.state && (
        <Toast
          state={toastState.state}
          message={toastState.message}
          onClear={() => setToastState({ state: "", message: "" })}
        />
      )}
    </section>
  );
};

export default HubProfile;

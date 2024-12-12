"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/provider/UserContextProvider";
import { useRouter } from "next/navigation";
import Toast from "@/components/Common/Toast/Toast";
import MypageProfileInfo from "@/components/Common/Skeleton/MypageProfileInfo";

const ProfileInfo: React.FC = () => {
  const supabase = createClient();
  const router = useRouter();
  const { user, userData, fetchUserData } = useUser();
  const [nickname, setNickname] = useState("");
  const [job, setJob] = useState("");
  const [experience, setExperience] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [toastState, setToastState] = useState({ state: "", message: "" });

  // userData 변경 시 상태 초기화
  useEffect(() => {
    if (userData) {
      setNickname(userData.nickname ?? "");
      setJob(userData.job_title ?? "");
      setExperience(userData.experience ?? "");
    }
  }, [userData]);

  // 닉네임 유효성 검사
  useEffect(() => {
    const checkNicknameValidity = async () => {
      if (!nickname || nickname === userData?.nickname || !user?.id) {
        setNicknameError("");
        return;
      }

      const specialCharPattern = /[^a-zA-Z0-9가-힣_]/;

      if (nickname.length < 2 || nickname.length > 11) {
        setNicknameError("닉네임은 2-11자 내로 입력해주세요.");
        return;
      } else if (specialCharPattern.test(nickname)) {
        setNicknameError("닉네임에는 공백이나 특수문자를 사용할 수 없습니다.");
        return;
      }

      const { data, error } = await supabase
        .from("Users")
        .select("nickname")
        .eq("nickname", nickname)
        .neq("user_id", user?.id); // user_id가 유효할 때만 체크

      if (error) {
        setNicknameError("닉네임 중복 검사에 실패했습니다.");
        console.error("닉네임 중복 검사 오류:", error);
        return;
      }

      if (data && data.length > 0) {
        setNicknameError("이미 사용 중인 닉네임입니다.");
      } else {
        setNicknameError("");
      }
    };

    if (nickname) {
      checkNicknameValidity();
    }
  }, [nickname, supabase, user?.id, userData?.nickname]);

  // 폼 유효성 검사
  const validateForm = () => {
    let valid = true;

    if (nickname.length < 2 || nickname.length > 11 || nicknameError) {
      valid = false;
    }

    return valid;
  };

  // 정보 업데이트
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id || !validateForm()) {
      return;
    }

    const { error } = await supabase
      .from("Users")
      .update({ nickname, job_title: job, experience })
      .eq("user_id", user.id); // user_id로 업데이트

    if (error) {
      setToastState({ state: "error", message: "업데이트에 실패했습니다." });
    } else {
      setToastState({ state: "success", message: "업데이트 완료되었습니다." });
      fetchUserData();
    }
  };

  // 정보 리셋 처리
  const handleReset = () => {
    setIsCancelModalOpen(true);
  };

  // 취소 모달 처리
  const handleConfirmLeave = () => {
    setIsCancelModalOpen(false);
    if (userData) {
      setNickname(userData.nickname ?? "");
      setJob(userData.job_title ?? "");
      setExperience(userData.experience ?? "");
    }
    router.push("/");
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const renderCancelModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-65 text-center z-50">
      <div className="relative min-w-[340px] m:min-w-[300px] p-6 bg-fillStrong rounded-lg shadow-lg z-60">
        <h2 className="mb-2 text-lg font-baseBold text-fontWhite">수정 중인 내용이 있어요.</h2>
        <p className="text-labelNeutral text-baseS mb-5">이 화면을 나가시면 변경한 내용이 저장되지 않아요.</p>
        <div className="flex justify-center space-x-2">
          <button onClick={handleCloseCancelModal} className="shared-button-gray w-1/2">
            마저 쓸래요
          </button>
          <button onClick={handleConfirmLeave} className="shared-button-green w-1/2">
            나갈래요
          </button>
        </div>
      </div>
    </div>
  );

  // 프로필 데이터가 없는 경우 스켈레톤 컴포넌트 렌더링
  if (!user) {
    return <MypageProfileInfo />;
  }

  return (
    <section>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <fieldset className="p-6 s:p-0">
          <h1 className="text-subtitle font-baseBold text-labelNeutral mb-5">기본 정보</h1>
          <div className="grid grid-cols-2 m:grid-cols-1 gap-10 pb-11 border-b-[1px] border-fillNormal">
            <div>
              <label htmlFor="email" className="block text-sm text-labelDisabled font-medium mb-1">
                이메일
              </label>
              <input
                type="text"
                id="email"
                name="email"
                disabled
                value={user?.email ?? ""}
                className="w-full shared-input-gray-2 border-[1px] border-fillLight"
                style={{ color: "#5E5E5E" }}
              />
            </div>
            <div>
              <label htmlFor="nickname" className="block text-baseS text-labelNormal font-medium mb-1">
                닉네임 <span className="text-statusDestructive ml-1">*</span>
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요."
                className="w-full shared-input-gray-2 border-[1px] border-fillLight"
              />
              {nicknameError && <p className="text-statusDestructive text-baseXs mt-1">{nicknameError}</p>}
              <p className="text-labelAssistive text-baseXs mt-1">닉네임은 2-11자 내로 작성해주세요.</p>
            </div>
            <div className="mt-[-13px] s:mt-0">
              <label htmlFor="job" className="block text-sm font-medium text-labelNormal mb-1">
                직군 <span className="text-statusDestructive ml-1">*</span>
              </label>
              <select
                id="job"
                name="job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="w-full shared-select-gray-2 border-[1px] border-fillLight"
              >
                <option value="">선택해주세요</option>
                <option value="프론트엔드">프론트엔드</option>
                <option value="백엔드">백엔드</option>
                <option value="디자인">디자인</option>
                <option value="IOS">IOS</option>
                <option value="안드로이드">안드로이드</option>
                <option value="데브옵스">데브옵스</option>
                <option value="PM">PM</option>
                <option value="기획">기획</option>
                <option value="마케팅">마케팅</option>
              </select>
            </div>
            <div className="mt-[-13px] s:mt-0">
              <label htmlFor="experience" className="block text-sm font-medium text-labelNormal mb-1">
                경력<span className="text-statusDestructive ml-1">*</span>
              </label>
              <select
                id="experience"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full shared-select-gray-2 border-[1px] border-fillLight"
              >
                <option value="">선택해주세요</option>
                <option value="1년 미만">1년 미만</option>
                <option value="1년">1년</option>
                <option value="2년">2년</option>
                <option value="3년">3년</option>
                <option value="4년">4년</option>
                <option value="5년">5년</option>
                <option value="6년">6년</option>
                <option value="7년">7년</option>
                <option value="8년 이상">8년 이상</option>
              </select>
            </div>
          </div>
          <div className="mt-6 mb-12">
            <div className="s:fixed flex s:justify-center s:bottom-0 s:left-0 s:right-0 s:p-4 s:bg-background s:z-10">
              <div className="flex justify-end s:justify-center gap-2 w-full s:max-w-container-s">
                <button type="button" aria-label="회원 정보 취소" className="shared-button-gray w-[65px] s:w-1/2">
                  취소
                </button>
                <button type="submit" aria-label="회원 정보 저장" className="shared-button-green w-[65px] s:w-1/2">
                  저장
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
      {isCancelModalOpen && renderCancelModal()}
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

export default ProfileInfo;

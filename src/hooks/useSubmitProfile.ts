import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { FormValues } from "@/components/Signup/Signup03";
import { useUser } from "@/provider/UserContextProvider"; 

const supabase = createClient();

const useSubmitProfile = (setUserData: (data: any) => void) => {   // useUser 훅을 통해 사용자 관련 정보와 상태 업데이트 함수들을 가져옴
  const {
    nextStep,
    setNickname,
    setUser,
    setProfileImageUrl,
    user,
    job_title,
    experience,
    profile_image_url
  } = useUser();
  


  // 컴포넌트가 마운트되면 현재 사용자 세션을 가져와 사용자 정보를 설정
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // 세션이 있으면 사용자 정보를 설정하고, 아바타 URL이 있으면 프로필 이미지 URL을 설정
      if (session) {
        setUser(session.user);
        if (session.user.user_metadata?.avatar_url) {
          setProfileImageUrl(session.user.user_metadata.avatar_url);
        }
      }
    };

    fetchUser();
  }, [setUser, setProfileImageUrl]);

  

  //프로필 제출 함수
  const onSubmit = async (data: FormValues, nicknameAvailable: boolean | null, setError: any) => {
    const { nickname } = data;

    // 사용자 이메일이 없으면 에러 처리
    if (!user?.email) {
      setError("nickname", { message: "유효한 이메일을 확인할 수 없습니다." });
      return;
    }

    // 닉네임이 중복되면 에러 처리
    if (nicknameAvailable === false) {
      setError("nickname", { message: "이미 사용 중인 닉네임입니다." });
      return;
    }

    try {
      const { error: updateError } = await supabase // Supabase에서 Users 테이블을 업데이트하여 프로필 정보를 저장
        .from("Users")
        .update({
          job_title,
          experience,
          nickname,
          email: user.email,
          profile_image_url,
        })
        .eq("user_id", user.id);

      if (updateError) {
        console.error("Error updating data:", updateError);
        setError("nickname", { message: "프로필 업데이트에 실패했습니다. 다시 시도해 주세요." });
        return;
      }

      // 성공적으로 업데이트되면 상태 업데이트
      setNickname(nickname);
      setUserData({ ...user, nickname, job_title, experience, profile_image_url });

      nextStep();
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("nickname", { message: "예기치 않은 오류가 발생했습니다. 다시 시도해 주세요." });
    }
  };

  return { onSubmit };
};

export default useSubmitProfile;

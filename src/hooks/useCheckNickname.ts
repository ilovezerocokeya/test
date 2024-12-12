import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const useCheckNickname = (nickname: string) => {
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null);

  // 닉네임 유효성 검사 및 사용 가능 여부 체크하는 함수
  useEffect(() => {
    const checkNicknameAvailability = async () => {
      const specialCharPattern = /[^a-zA-Z0-9가-힣_]/;

      if (
        !nickname ||
        typeof nickname !== "string" ||
        nickname.length < 2 ||
        nickname.length > 11 ||
        specialCharPattern.test(nickname)
      ) {
        setNicknameAvailable(null);
        return;
      }

      // Supabase의 Users 테이블에서 닉네임을 조회하여 중복 여부 확인
      const { data, error } = await supabase.from("Users").select("nickname").eq("nickname", nickname);

      if (error) {
        console.error("Error checking nickname availability:", error);
        return;
      }
      
      // 닉네임이 사용 중이지 않으면 true, 사용 중이면 false로 설정
      setNicknameAvailable(data.length === 0);
    };

    checkNicknameAvailability();
  }, [nickname]);

  return nicknameAvailable;
};

export default useCheckNickname;

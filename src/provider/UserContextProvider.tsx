import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

// 사용자 인증 상태 인터페이스
// 로그인한 사용자의 정보를 포함하고 있으며, 인증 상태와 관련된 함수를 제공합니다.
interface AuthState {
  user: User | null; // 현재 로그인한 사용자
  isAuthenticated: boolean; // 사용자의 인증 여부
  setUser: (user: User | null) => void; // 사용자를 설정하는 함수
  resetAuthUser: () => void; // 사용자 인증 정보를 초기화하는 함수
}

// 사용자의 프로필과 관련된 데이터를 관리하는 인터페이스입니다.
// 사용자의 직업 정보, 포트폴리오, 자기소개 등 멤버 카드와 관련된 세부 정보를 포함합니다.
interface UserData {
  id: string;
  nickname: string;
  job_title: string;
  experience: string;
  description: string; // 자기소개
  profile_image_url: string;
  blog: string; // 대표 포트폴리오
  hubCard?: boolean;
  background_image_url?: string; // 포트폴리오 이미지
  answer1?: string;
  answer2?: string;
  answer3?: string;
  first_link_type?: string;
  first_link?: string;
  second_link_type?: string;
  second_link?: string;
  tech_stacks?: string[];
}

// 회원가입 상태를 관리하는 인터페이스입니다.
// 회원가입 프로세스의 단계별 상태를 포함하고 있으며, 관련된 필드를 업데이트하거나 초기화하는 함수를 제공합니다.
interface SignupState {
  step: number;
  job_title: string;
  experience: string;
  nickname: string;
  blog: string;
  profile_image_url: string;
  setField: (field: keyof SignupState, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetSignupUser: () => void;
  setJob: (job_title: string) => void;
  setProfileImageUrl: (url: string) => void;
  setBlog: (blog: string) => void;
  setNickname: (nickname: string) => void;
}

// 전체 상태를 관리하는 인터페이스입니다.
// AuthState, SignupState, UserData를 상속받아 사용자 인증, 회원가입 상태, 사용자 데이터를 모두 포함합니다.
interface StoreState extends AuthState, SignupState {
  userData: UserData | null; // 사용자 관련 데이터
  setUserData: (data: UserData | null) => void; // 사용자 데이터를 설정하는 함수
  fetchUserData: () => Promise<void>; // 사용자 데이터를 가져오는 함수
  initializationUser: () => void; // 모든 사용자 관련 상태를 초기화하는 함수
  loading: boolean; // 로딩 상태 (비동기 작업 동안 true)
  description?: string; // description 추가
  background_image_url?: string; // background_image_url 추가
  hubCard?: boolean; // hubCard 추가
  likedMembers: { [key: string]: boolean }; // 특정 유저에 대한 좋아요 상태를 저장하는 객체
  toggleLike: (nickname: string) => void; // 좋아요 상태를 변경하는 함수, nickname을 인자로 받아 상태를 변경함
  updateUserAnswers: (answers: { answer1?: string; answer2?: string; answer3?: string }) => Promise<void>; // 사용자 답변을 업데이트하는 비동기 함수
  tech_stacks?: string[];
}

// UserContext 생성 (기본값은 undefined로 설정)
const UserContext = createContext<StoreState | undefined>(undefined);

// UserProvider 컴포넌트: 전역 사용자 상태를 관리하고 하위 컴포넌트들에게 UserContext를 제공
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const supabase = createClient();

  // 사용자 인증 상태
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  //사용자 데이터 상태
  const [userData, setUserData] = useState<UserData | null>(null);

  //로딩 상태
  const [loading, setLoading] = useState<boolean>(false);

  // 유저 답변을 업데이트하는 함수
  const updateUserAnswers = async (answers: Partial<UserData>) => {
    if (!user) return;
    try {
      const { error } = await supabase.from("Users").update(answers).eq("user_id", user.id);

      if (error) {
        console.error("Error updating answers:", error.message);
      } else {
        setUserData((prev) => {
          if (prev) {
            return { ...prev, ...answers };
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Error updating answers:", error);
    }
  };

  // 좋아요 상태
  const [likedMembers, setLikedMembers] = useState<{ [key: string]: boolean }>({});
  const toggleLike = (nickname: string) => {
    setLikedMembers((prevLikedMembers) => ({
      ...prevLikedMembers,
      [nickname]: !prevLikedMembers[nickname], // 좋아요 상태 반전
    }));
  };

  // 회원가입 상태
  const [step, setStep] = useState<number>(1);
  const [job_title, setJobTitle] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [blog, setBlog] = useState<string>("");
  const [profile_image_url, setProfileImageUrl] = useState<string>("");

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          console.error("세션 가져오는 중 오류:", error.message);
          return;
        }

        if (data?.user) {
          setAuthUser(data.user);
        } else {
          console.log("로그인된 사용자가 없습니다.");
        }
      } catch (error) {
        console.error("세션 확인 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      checkSession(); // 로그인된 사용자가 없을 경우 세션을 확인
    }
  }, [user, supabase]);

  // 사용자 데이터를 서버에서 가져오는 함수 수정
  const fetchUserData = useCallback(async () => {
    if (!user || !user.id || userData) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("Users")
        .select(
          "nickname, job_title, experience, profile_image_url, blog, hubCard, description, background_image_url, answer1, answer2, answer3, tech_stacks",
        )
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error.message);
        return;
      }

      if (data) {
        setUserData(data as unknown as UserData); // 일단 unknown으로 처리 후 UserData로 캐스팅
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [user, userData, supabase]);

  // 사용자 인증 정보를 설정하는 함수
  const setAuthUser = useCallback(
    async (user: User | null) => {
      setUser(user);
      setIsAuthenticated(!!user); // 사용자가 있으면 true, 없으면 false로 설정

      if (user && !userData) {
        // 사용자 데이터가 없으면 서버에서 데이터를 가져옴
        await fetchUserData();
      }
    },
    [fetchUserData, userData],
  );

  // 사용자 인증 상태를 초기화하는 함수 (로그아웃 시 호출)
  const resetAuthUser = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setUserData(null); // 유저 데이터도 null로 초기화
  }, []);

  // 회원가입 상태 필드 업데이트 함수
  const setField = useCallback((field: keyof SignupState, value: string) => {
    switch (field) {
      case "job_title":
        setJobTitle(value);
        break;
      case "experience":
        setExperience(value);
        break;
      case "nickname":
        setNickname(value);
        break;
      case "blog":
        setBlog(value);
        break;
      case "profile_image_url":
        setProfileImageUrl(value);
        break;
      default:
        break;
    }
  }, []);

  const setJob = (job_title: string) => setJobTitle(job_title);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // 회원가입 상태 초기화
  const resetSignupUser = () => {
    setStep(1);
    setJobTitle("");
    setExperience("");
    setNickname("");
    setBlog("");
    setProfileImageUrl("");
  };

  // 사용자 상태 초기화
  const initializationUser = () => {
    resetAuthUser();
    resetSignupUser();
  };

  // Context에 제공할 값에 userData.hubCard 상태 포함
  const contextValue: StoreState = {
    user,
    isAuthenticated,
    setUser: setAuthUser,
    resetAuthUser,
    userData,
    setUserData,
    fetchUserData,
    initializationUser,
    step,
    job_title,
    experience,
    nickname,
    blog,
    profile_image_url,
    description: userData?.description || "",
    background_image_url: userData?.background_image_url || "",
    hubCard: userData?.hubCard || false,
    tech_stacks: userData?.tech_stacks || [],
    setField,
    nextStep,
    prevStep,
    resetSignupUser,
    setJob,
    setProfileImageUrl,
    setBlog,
    setNickname,
    loading,
    likedMembers,
    toggleLike,
    updateUserAnswers,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Hook을 통한 Context 사용
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser는 UserProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};

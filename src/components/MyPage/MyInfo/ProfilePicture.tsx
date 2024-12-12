"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ProfileLoader from "@/components/Common/Skeleton/ProfileLoader";
import Image from "next/image";
import { useUser } from "@/provider/UserContextProvider";
import CommonModal from "@/components/Common/Modal/CommonModal";
import LoginForm from "@/components/Login/LoginForm";
import Toast from "@/components/Common/Toast/Toast";
import MypageProfilePicture from "@/components/Common/Skeleton/MypageProfilePicture";

const ProfilePicture: React.FC = () => {
  const supabase = createClient();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileAlt, setProfileAlt] = useState<string>("프로필 이미지");
  const [uploading, setUploading] = useState(false);
  const { user, userData, setUserData } = useUser();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [toastState, setToastState] = useState({ state: "", message: "" });
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const router = useRouter();
  const defaultImage = "/assets/header/user.svg";

  const iconImages = useMemo(() => {
    return Array.from(
      { length: 9 },
      (_, index) => `${imageBaseUrl}/profileicon_dark_${String(index + 1).padStart(2, "0")}.png`,
    );
  }, [imageBaseUrl]);

  const occupations = ["프론트엔드", "백엔드", "IOS", "안드로이드", "데브옵스", "디자인", "PM", "기획", "마케팅"];

  const uploadProfileImage = async (file: File | Blob, altText: string) => {
    if (!user || !user.id) {
      console.error("사용자 정보가 없습니다.");
      return;
    }

    setUploading(true);

    try {
      const FileName = `profile_${base64Encode(user.id)}.png`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(`profileImages/${FileName}`, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: profileImageUrlData } = await supabase.storage
        .from("images")
        .getPublicUrl(`profileImages/${FileName}`);

      const profileImageUrl = profileImageUrlData.publicUrl;

      if (profileImageUrl) {
        const { error: updateError } = await supabase
          .from("Users")
          .update({ profile_image_url: profileImageUrl })
          .eq("user_id", user.id);
        if (updateError) throw updateError;

        setProfileImage(profileImageUrl);
        setProfileAlt(altText);
        setUserData({
          ...userData,
          id: user.id ?? "",
          profile_image_url: profileImageUrl,
          nickname: userData?.nickname ?? "",
          job_title: userData?.job_title ?? "",
          experience: userData?.experience ?? "",
          blog: userData?.blog ?? "",
          description: userData?.description ?? "",
          answer1: userData?.answer1 ?? "",
          answer2: userData?.answer2 ?? "",
          answer3: userData?.answer3 ?? "",
        });
        setToastState({ state: "success", message: "업데이트 완료되었습니다" });
      } else {
        throw new Error("프로필 이미지 URL을 얻지 못했습니다.");
      }
    } catch (error) {
      console.error("프로필 이미지 업데이트 중 오류 발생:", error);
      setToastState({ state: "error", message: "업데이트에 실패했습니다." });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) await uploadProfileImage(file, "프로필 이미지");
  };

  const handleIconClick = async (iconUrl: string, altText: string) => {
    const response = await fetch(iconUrl);
    const blob = await response.blob();
    await uploadProfileImage(blob, altText);
  };

  const handleImageError = () => {
    setProfileImage(null);
    setProfileAlt("프로필 이미지");
  };

  const handleFileUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const getProfileImageUrl = (url: string) => {
    return url ? `${url}?${new Date().getTime()}` : defaultImage;
  };

  useEffect(() => {
    if (userData && userData.profile_image_url !== profileImage) {
      setProfileImage(userData?.profile_image_url || defaultImage);
    }
  }, [userData, profileImage]);

  const base64Encode = (str: string) => {
    return Buffer.from(str).toString("base64");
  };

  return (
    <div>
      {user?.id ? (
        <>
          <CommonModal
            isOpen={showLoginModal}
            onRequestClose={() => {
              setShowLoginModal(false);
              router.push("/");
            }}
          >
            <LoginForm />
          </CommonModal>
          <div className="px-6 pt-6 pb-10 s:p-0 s:pb-4 border-b-[1px] border-fillNormal">
            <label className="block text-subtitle font-baseBold text-labelNeutral mb-5">프로필 사진</label>
            <div className="flex items-center flex-wrap s:mb-3 gap-5">
              <div className="w-36 h-36  m:w-40 m:h-40 s:w-36 s:h-36 rounded-[20px] overflow-hidden bg-fillLight flex items-center justify-center s:mb-3 relative group">
                {uploading ? (
                  <ProfileLoader className="w-full h-full rounded-[20px]" />
                ) : profileImage ? (
                  <Image
                    src={getProfileImageUrl(profileImage)}
                    alt={profileAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1068px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="rounded-[20px]"
                    onError={handleImageError}
                    priority
                  />
                ) : (
                  <ProfileLoader className="w-full h-full rounded-[20px]" />
                )}
                {!uploading && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-black bg-opacity-50 m:group-hover:opacity-100 transition-opacity z-10"></div>
                    <button
                      type="button"
                      className="hidden m:block absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] bg-fillLight opacity-0 group-hover:opacity-100 z-20 rounded-[20px]"
                      onClick={handleFileUploadClick}
                    >
                      <Image
                        src="/assets/mypage/image_upload.svg"
                        alt="이미지 업로드 아이콘"
                        width={24}
                        height={24}
                        className="mx-auto"
                      />
                    </button>
                  </div>
                )}
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className="grid grid-cols-5 m:grid-cols-3 gap-2 s:mb-4">
                <div className="relative m:hidden">
                  <button
                    type="button"
                    className="w-[52px] h-[52px] m:w-[48px] m:h-[48px] rounded-full overflow-hidden bg-fillLight flex items-center justify-center"
                    onClick={handleFileUploadClick}
                  >
                    <Image src="/assets/mypage/image_upload.svg" alt="이미지 업로드 아이콘" width={24} height={24} />
                  </button>
                </div>
                {iconImages.map((icon, index) => (
                  <div key={index} className="relative group">
                    <button
                      type="button"
                      className="w-[52px] h-[52px] m:w-[48px] m:h-[48px] rounded-full m:rounded-[9px] overflow-hidden bg-fillNeutral flex items-center justify-center"
                      onClick={() => handleIconClick(icon, `${occupations[index]} 프로필 이미지`)}
                    >
                      <div className="w-full h-full relative">
                        <Image
                          src={icon}
                          alt={`${occupations[index]} 프로필 이미지`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1068px) 100vw"
                          style={{ objectFit: "cover" }}
                          className="rounded-full m:rounded-[9px]"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <Image
                            alt="호버시 플러스 버튼 아이콘"
                            src="/assets/mypage/hover_plus.svg"
                            width={24}
                            height={24}
                          />
                        </div>
                      </div>
                    </button>
                    <div
                      className={`absolute z-20 whitespace-nowrap py-1 px-2 min-h-6 ${
                        index < 4 ? "bottom-full mb-2" : "top-full mt-2"
                      } left-1/2 transform -translate-x-1/2 ${
                        index === 0 ? "s:-translate-x-1/4" : ""
                      } bg-fillStrong text-fontWhite text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        index < 4 ? "bottom-full mb-2" : "top-full mt-2"
                      } m:top-full m:mt-2`}
                    >
                      {occupations[index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {toastState.state && (
            <Toast
              state={toastState.state}
              message={toastState.message}
              onClear={() => setToastState({ state: "", message: "" })}
            />
          )}
        </>
      ) : (
        <MypageProfilePicture />
      )}
    </div>
  );
};

export default ProfilePicture;

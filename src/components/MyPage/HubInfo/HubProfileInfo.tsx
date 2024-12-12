"use client";

import React, { useState, useEffect } from "react";

const HubProfileForm: React.FC<{
  blog: string;
  setBlog: (value: string) => void;
  firstLinkType: string;
  setFirstLinkType: (value: string) => void;
  firstLink: string;
  setFirstLink: (value: string) => void;
  secondLinkType: string;
  setSecondLinkType: (value: string) => void;
  secondLink: string;
  setSecondLink: (value: string) => void;
}> = ({
  blog,
  setBlog,
  firstLinkType,
  setFirstLinkType,
  firstLink,
  setFirstLink,
  secondLinkType,
  setSecondLinkType,
  secondLink,
  setSecondLink,
}) => {
  const [blogError, setBlogError] = useState("");
  const [firstLinkError, setFirstLinkError] = useState("");
  const [secondLinkError, setSecondLinkError] = useState("");

  // 상태를 필드가 비어있는지에 따라 설정
  const [showFirstLink, setShowFirstLink] = useState(false);
  const [showSecondLink, setShowSecondLink] = useState(false);

  useEffect(() => {
    // 만약 firstLink나 secondLink가 이미 존재하면 해당 필드를 보이게 설정
    if (firstLink) setShowFirstLink(true);
    if (secondLink) setShowSecondLink(true);
  }, [firstLink, secondLink]);

  const platforms = [
    { value: "behance", label: "비핸스" },
    { value: "github", label: "깃허브" },
    { value: "instagram", label: "인스타그램" },
    { value: "brunch", label: "브런치" },
    { value: "linkedin", label: "링크드인" },
    { value: "notion", label: "노션" },
    { value: "pinterest", label: "핀터레스트" },
    { value: "medium", label: "미디엄" },
    { value: "tistory", label: "티스토리" },
    { value: "facebook", label: "페이스북" },
    { value: "youtube", label: "유튜브" },
  ];

  // URL 유효성 검사 (http:// 또는 https:// 자동 추가)
  const normalizeURL = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`; // URL이 http:// 또는 https://로 시작하지 않으면 https://를 추가
    }
    return url;
  };

  const validateURL = (url: string) => {
    try {
      new URL(normalizeURL(url));
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // URL 유효성 검사
    if (!validateURL(blog)) {
      setBlogError("올바른 포트폴리오 링크를 입력해주세요.");
      return;
    } else {
      setBlogError("");
    }

    if (firstLink && !validateURL(firstLink)) {
      setFirstLinkError("올바른 첫 번째 링크를 입력해주세요.");
      return;
    } else {
      setFirstLinkError("");
    }

    if (secondLink && !validateURL(secondLink)) {
      setSecondLinkError("올바른 두 번째 링크를 입력해주세요.");
      return;
    } else {
      setSecondLinkError("");
    }

    // 모든 유효성 검사를 통과하면 제출 가능
    console.log("모든 링크가 유효합니다.");
  };

  const handleAddFirstLink = () => {
    setShowFirstLink(true);
  };

  const handleAddSecondLink = () => {
    setShowSecondLink(true);
  };

  return (
    <form className="space-y-6 ml-2" onSubmit={handleSubmit}>
      <fieldset className="p-3 s:p-0">
        <div>
          <h1 className="text-subtitle font-baseBold text-labelNeutral mb-5">URL</h1>
          {/* 포트폴리오 링크 */}
          <label htmlFor="blog" className="block text-sm font-medium text-labelNormal mb-1">
            포트폴리오 링크<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="url"
            id="blog"
            name="blog"
            value={blog}
            onChange={(e) => setBlog(normalizeURL(e.target.value))}
            placeholder="포트폴리오 링크를 입력하세요."
            className={`w-full shared-input-gray-2 border-[1px] ${blogError ? "border-red-500" : "border-fillLight"}`}
          />
          {blogError && <p className="text-red-500 text-sm mt-1">{blogError}</p>}
        </div>

        {/* 첫 번째 링크는 입력된 값이 있으면 표시 */}
        {showFirstLink && (
          <div>
            <label htmlFor="firstLinkType" className="block text-sm font-medium text-labelNormal mb-1">
              추가 링크
            </label>
            <div className="flex gap-2">
              <select
                id="firstLinkType"
                name="firstLinkType"
                value={firstLinkType}
                onChange={(e) => setFirstLinkType(e.target.value)}
                className="w-1/3 shared-select-gray-2 border-[1px] border-fillLight"
              >
                <option value="">링크 선택</option>
                {platforms.map((platform) => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
              <input
                type="url"
                id="firstLink"
                name="firstLink"
                value={firstLink}
                onChange={(e) => setFirstLink(normalizeURL(e.target.value))}
                placeholder="링크를 입력하세요."
                className="w-2/3 shared-input-gray-2 border-[1px] border-fillLight"
              />
            </div>
            {firstLinkError && <p className="text-red-500 text-sm mt-1">{firstLinkError}</p>}
          </div>
        )}

        {!showFirstLink && (
          <button
            type="button"
            onClick={handleAddFirstLink}
            className="text-labelNeutral hover:text-primary mt-2 text-sm flex items-center"
          >
            <span className="mr-2">+</span> 추가 링크
          </button>
        )}

        {/* 두 번째 링크는 입력된 값이 있으면 표시 */}
        {showSecondLink && (
          <div>
            <label htmlFor="secondLinkType" className="block text-sm font-medium text-labelNormal mb-1">
              추가 링크 2
            </label>
            <div className="flex gap-2">
              <select
                id="secondLinkType"
                name="secondLinkType"
                value={secondLinkType}
                onChange={(e) => setSecondLinkType(e.target.value)}
                className="w-1/3 shared-select-gray-2 border-[1px] border-fillLight"
              >
                <option value="">링크 선택</option>
                {platforms.map((platform) => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label}
                  </option>
                ))}
              </select>
              <input
                type="url"
                id="secondLink"
                name="secondLink"
                value={secondLink}
                onChange={(e) => setSecondLink(normalizeURL(e.target.value))}
                placeholder="링크를 입력하세요."
                className="w-2/3 shared-input-gray-2 border-[1px] border-fillLight"
              />
            </div>
            {secondLinkError && <p className="text-red-500 text-sm mt-1">{secondLinkError}</p>}
          </div>
        )}

        {showFirstLink && !showSecondLink && (
          <button
            type="button"
            onClick={handleAddSecondLink}
            className="text-labelNeutral hover:text-primary mt-2 text-sm flex items-center"
          >
            <span className="mr-2">+</span> 추가 링크 2
          </button>
        )}

        <p className="text-labelAssistive text-xs mt-2">URL은 최대 3개까지 등록 가능합니다.</p>
      </fieldset>
    </form>
  );
};

export default HubProfileForm;

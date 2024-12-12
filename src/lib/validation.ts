export const validateDraft = (draft: any) => {
  if (!draft.title.trim()) return "제목을 입력해주세요.";
  if (!draft.category.trim()) return "분류를 선택해주세요.";
  if (!draft.place.trim()) return "진행 방식을 선택해주세요.";
  if (!draft.location.trim()) return "지역을 선택해주세요.";
  if (!draft.duration.trim()) return "기간을 선택해주세요.";
  if (!draft.totalMembers.trim()) return "총 인원을 선택해주세요.";
  if (!draft.personalLink.trim()) return "연락 방법을 입력해주세요.";
  if (draft.targetPosition.length === 0) return "모집 대상을 선택해주세요.";
  if (!draft.recruitments.trim()) return "모집 인원을 선택해주세요.";
  if (draft.techStack.length === 0) return "기술 스택을 선택해주세요.";
  if (!draft.deadline.trim()) return "마감일을 선택해주세요.";
  if (!draft.content.trim()) return "상세 설명을 입력해주세요.";
  return null;
};

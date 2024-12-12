import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const AlertModal: React.FC<ModalProps> = ({ isOpen, onCancel, onConfirm }) => {

  // Esc 키를 눌렀을 때 모달을 닫는 처리
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel(); // Esc 키를 누르면 onCancel 함수 호출
      }
    };

    if (isOpen) {
      // 모달이 열리면 스크롤 막기
      document.body.style.overflow = 'hidden';
      // Esc 키 이벤트 리스너 추가
      window.addEventListener("keydown", handleEsc);
    } else {
      // 모달이 닫히면 스크롤 복구
      document.body.style.overflow = 'auto';
    }

    return () => {
      // 컴포넌트가 언마운트될 때, 또는 모달이 닫힐 때 이벤트 리스너 제거 및 스크롤 복구
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onCancel]);

  // 모달 바깥을 클릭하면 모달을 닫는 처리
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel(); // 바깥을 클릭하면 onCancel 호출
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
      onClick={handleBackgroundClick} 
    >
      <div
        className="bg-fillStrong w-[360px] p-6 rounded-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="text-lg font-semibold text-gray-100 mb-3">작성 중인 내용이 있어요.</div>
        <p className="text-sm text-gray-400 mb-6">
          지금 화면을 나가시면 프로필 기본 정보가 저장되지 않아요. <br />
          회원님의 기본 프로필 작성을 취소하시겠어요?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-[#3a3a3d] text-primary px-4 py-2 w-[48%] rounded-md text-sm font-semibold transition-colors duration-200 hover:bg-#88888f hover:text-white"
          >
            마저 쓸래요
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#b4e373] text-[#343437] px-4 py-2 w-[48%] rounded-md text-sm font-semibold transition-colors duration-200 hover:bg-[#9cb97a] hover:text-white"
          >
            나갈래요
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
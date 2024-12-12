import React from 'react';

interface SkipButtonProps {
  onSkip: () => void;
}

const SkipButton: React.FC<SkipButtonProps> = ({ onSkip }) => {
  return (
    <button 
      onClick={onSkip} 
      className="absolute top-10 right-9 text-[#ffffff] text-sm font-medium hover:text-[#777]"
    >
      건너뛰기
    </button>
  );
};

export default SkipButton;
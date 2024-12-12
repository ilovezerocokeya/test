import React from 'react';

interface ExperienceLevelButtonProps {
  experience: string;
  isSelected: boolean;
  onSelect: (experience: string) => void;
}

const ExperienceLevelButton: React.FC<ExperienceLevelButtonProps> = ({ experience, isSelected, onSelect }) => {
  const baseClass = "square-button square-button-default bg-[#343437] text-[#c4c4c4]";
  const selectedClass = isSelected ? "bg-[#ffffff] text-[#343437] font-medium shadow-lg" : "";
  const buttonClass = `${baseClass} ${selectedClass}`;

  return (
    <button onClick={() => onSelect(experience)} className={buttonClass}>
      {experience}
    </button>
  );
};

export default ExperienceLevelButton;
import React from 'react';

interface JobSelectionButtonProps {
  job: string;
  isSelected: boolean;
  onSelect: (job: string) => void;
  className: string;
}

const JobSelectionButton: React.FC<JobSelectionButtonProps> = ({ job, isSelected, onSelect, className }) => {
  const handleClick = () => {
    onSelect(job);
  };

  const selectedClass = isSelected ? 'bg-[#343434] text-[#c4c4c4] font-medium shadow-lg' : '';

  return (
    <button onClick={handleClick} className={`${className} ${selectedClass}`}>
      {job}
    </button>
  );
};

export default JobSelectionButton;
"use client";
import React from "react";

interface EventFilterBarProps {
  selectedCategory: string;

  onChange: (selectedCategory: string) => void;
}

const EventFilterBar: React.FC<EventFilterBarProps> = ({ selectedCategory, onChange }) => {
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex justify-between items-center mt-3 mb-5">
      <div className="grid grid-cols-1 gap-2 w-full s:grid-cols-2 md:grid-cols-4 md:gap-3">
        <select
          className={`shared-select-gray-2 ${
            selectedCategory ? "shared-select" : "shared-select-gray-2"
          } cursor-pointer`}
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ height: "40px", minHeight: "40px", lineHeight: "15px", padding: "0 1rem" }}
        >
          <option value="">유형</option>
          <option value="공모전">공모전</option>
          <option value="부트캠프">부트캠프</option>
          <option value="해커톤">해커톤</option>
          <option value="컨퍼런스">컨퍼런스</option>
        </select>
      </div>
    </div>
  );
};

export default EventFilterBar;

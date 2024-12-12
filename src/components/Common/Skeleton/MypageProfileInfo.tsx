import React from "react";

const MypageProfileInfo: React.FC = () => {
  const fields = [
    { width: "w-24", height: "h-10" },
    { width: "w-20", height: "h-10" },
    { width: "w-20", height: "h-10" },
    { width: "w-20", height: "h-10" },
    { width: "w-20", height: "h-10" },
  ];

  return (
    <div className="space-y-6 animate-pulse">
      {fields.map((field, index) => (
        <div key={index}>
          <div className={`h-5 ${field.width} bg-fillLight mb-1 rounded`}></div>
          <div className={`h-10 w-3/4 bg-fillLight rounded`}></div>
        </div>
      ))}
    </div>
  );
};

export default MypageProfileInfo;

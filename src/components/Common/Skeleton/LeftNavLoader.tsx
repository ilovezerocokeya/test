import React from "react";

const LeftNavLoader: React.FC = () => {
  return (
    <div className="animate-pulse flex items-center gap-3 mb-5">
      <div className="w-12 h-12 rounded-xl bg-fillLight"></div>
      <div>
        <div className="h-5 bg-fillLight rounded w-12 mb-2"></div>
        <div className="h-4 bg-fillLight rounded w-20"></div>
      </div>
    </div>
  );
};

export default LeftNavLoader;

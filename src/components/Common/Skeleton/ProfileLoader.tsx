import React from "react";

const ProfileLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-fillLight marker:w-full h-full"></div>
    </div>
  );
};

export default ProfileLoader;

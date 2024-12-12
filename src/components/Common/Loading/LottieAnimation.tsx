"use client";

import React from "react";
import Lottie from "react-lottie-player";

interface LottieAnimationProps {
  animationData: object;
  size?: string;
  isFixed?: boolean;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  size = "100%",
  isFixed = false,
  className = "",
}) => {
  return (
    <div
      className={`${isFixed ? "fixed inset-0" : "relative"} flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Lottie loop animationData={animationData} play style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default LottieAnimation;

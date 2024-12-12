"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LottiAnimation from "@/components/Common/Loading/LottieAnimation";
import loadingBar from "../../../assets/loadingBar.json";

interface InitialLoadingWrapperProps {
  children: React.ReactNode;
}

const InitialLoadingWrapper: React.FC<InitialLoadingWrapperProps> = ({ children }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/all") {
      setTimeout(() => {
        setInitialLoading(false);
      }, 500);
    } else {
      setInitialLoading(false);
    }
  }, [pathname]);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <LottiAnimation animationData={loadingBar} size="400px" />
      </div>
    );
  }

  return <>{children}</>;
};

export default InitialLoadingWrapper;

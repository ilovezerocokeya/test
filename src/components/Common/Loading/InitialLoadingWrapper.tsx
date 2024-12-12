"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import PuzzleAnimation from "./PuzzleAnimation";

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
        <PuzzleAnimation />
      </div>
    );
  }

  return <>{children}</>;
};

export default InitialLoadingWrapper;

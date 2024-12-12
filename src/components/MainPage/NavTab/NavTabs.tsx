"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavTabs = () => {
  const pathname = usePathname();

  return (
      <nav className="flex items-center w-[348px] s:w-full m:justify-start s:justify-center space-x-4 mt-3 mb-6 p-3 text-baseS bg-fillStrong rounded-2xl">
        <Link
          href="/all"
          className={`px-4 py-2 s:px-[12px] xs:px-[8px] rounded-xl ${
            pathname === "/all" ? "bg-fillNormal text-primary" : "text-labelNeutral"
          }`}
        >
          전체
        </Link>
        <Link
          href="/studies"
          className={`px-4 py-2 s:px-[12px] xs:px-[8px] rounded-xl ${
            pathname === "/studies" ? "bg-fillNormal  text-primary" : "text-labelNeutral"
          }`}
        >
          스터디
        </Link>
        <Link
          href="/projects"
          className={`px-4 py-2 s:px-[12px] xs:px-[8px] rounded-xl ${
            pathname === "/projects" ? "bg-fillNormal  text-primary" : "text-labelNeutral"
          }`}
        >
          프로젝트
        </Link>
        <Link
          href="/events"
          className={`px-4 py-2 s:px-[12px] xs:px-[8px] rounded-xl ${
            pathname === "/events" ? "bg-fillNormal  text-primary" : "text-labelNeutral"
          }`}
        >
          IT행사
        </Link>
    </nav>
  );
};

export default NavTabs;
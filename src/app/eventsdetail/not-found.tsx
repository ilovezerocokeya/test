"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      <Image
        src="/logos/404Error.gif"
        alt="Not Found"
        width={330}
        height={330}
        priority 
        style={{ marginBottom: '20px' }} 
      />
      <h1 style={{ color: "white", fontSize: "35px", fontWeight: "bold", marginBottom: "10px" }}>
        페이지를 찾을 수 없어요
      </h1>
      <p
        style={{
          color: "#6a6a6a",
          fontSize: "18px",
          textAlign: "center",
          lineHeight: "1.5",
          marginBottom: "30px",
          maxWidth: "300px",
        }}
      >
        존재하지 않는 주소를 입력하였거나, <br /> 요청하신 페이지의 주소가 변경·삭제되어 <br /> 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        style={{
          width: "35vh",
          color: "black",
          backgroundColor: "#c3e88d",
          padding: "15px 20px",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "16px",
          textAlign: "center",
          display: "inline-block",
          transition: "transform 0.2s ease, background-color 0.2s ease, color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.backgroundColor = "#6a6a6a";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.color = "black";
          e.currentTarget.style.backgroundColor = "#c3e88d";
        }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

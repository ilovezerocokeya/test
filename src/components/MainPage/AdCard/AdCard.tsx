import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import white from "@/../public/Main/AD/white.png";
import black from "@/../public/Main/AD/black.png";
import sparta1 from "@/../public/Main/AD/sparta1.png";
import sparta2 from "@/../public/Main/AD/sparta2.png";
import hanghae1 from "@/../public/Main/AD/hanghae1.png";
import hanghae2 from "@/../public/Main/AD/hanghae2.png";
import Image from "next/image";

const AdCard: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slideSets = [
    [
      {
        href: "https://nbcamp.spartacodingclub.kr/job-support",
        src: black,
        alt: "패스트캠퍼스 부트캠프",
      },
      {
        href: "https://nbcamp.spartacodingclub.kr/job-support",
        src: white,
        alt: "패스트캠퍼스",
      },
    ],
    [
      {
        href: "https://nbcamp.spartacodingclub.kr/",
        src: sparta1,
        alt: "내일배움스파르타 부트캠프",
      },
      {
        href: "https://nbcamp.spartacodingclub.kr/",
        src: sparta2,
        alt: "내일배움스파르타 부트캠프",
      },
    ],
    [
      {
        href: "https://hanghae99.spartacodingclub.kr/reboot",
        src: hanghae1,
        alt: "항해99",
      },
      {
        href: "https://hanghae99.spartacodingclub.kr/99club-codingtest",
        src: hanghae2,
        alt: "항해99 스터디",
      },
    ],
  ];

  const [slides, setSlides] = useState(slideSets[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * slideSets.length);
    setSlides(slideSets[randomIndex]);
  }, []);

  return (
    <div className="w-auto h-auto my-3">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <a href={slide.href} target="_blank" rel="noopener noreferrer">
              <Image src={slide.src} alt={slide.alt} className="mx-auto rounded-xl" priority />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AdCard;

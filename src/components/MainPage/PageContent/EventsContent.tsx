"use client";
import Image from "next/image";
import CarouselLoader from "@/components/Common/Skeleton/CarouselLoader";
import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import { Tables } from "@/types/supabase";
import { fetchEventsPosts, FetchEventsPostsFilters, fetchEventsPostsWithDeadLine } from "@/lib/fetchPosts";
import EventsInfiniteScrollComponent from "../InfiniteScroll/EventsInfiniteScroll";
import Calender from "../MainSideBar/Calender/Calender";
import EventFilterBar from "../FilterBar/EventFilterBar";
import useSearch from "@/hooks/useSearch";

const Carousel = dynamic(() => import("@/components/MainPage/Carousel/EventsCarousel"), { ssr: false });

const EventsContent: NextPage = () => {
  const [posts, setPosts] = useState<Tables<"IT_Events">[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { searchWord } = useSearch();

  const [carouselPosts, setCarouselPosts] = useState<Tables<"IT_Events">[]>([]);
  const [isLoadingCarousel, setIsLoadingCarousel] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [days, setDays] = useState<number>(30);

  useEffect(() => {
    const loadCarouselData = async () => {
      setIsLoadingCarousel(true);
      const carouselData = await fetchEventsPostsWithDeadLine(days);
      setCarouselPosts(carouselData);
      setIsLoadingCarousel(false);
    };
    loadCarouselData();
  }, [days]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1068);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadMorePosts = async () => {
    const filterOptions: FetchEventsPostsFilters = {
      category: selectedCategory,
    };

    const newPosts = await fetchEventsPosts(page);

    setPosts((prevPosts) => {
      const uniqueNewPosts = newPosts.filter(
        (newPost) => !prevPosts.some((post) => post.event_id === newPost.event_id),
      );
      return [...prevPosts, ...uniqueNewPosts];
    });

    setPage((prevPage) => prevPage + 1);

    if (newPosts.length < 5) {
      setHasMore(false);
    }
  };

  const handleEventFilterChange = useCallback(async (category: string) => {
    setSelectedCategory(category);

    setPage(1);
    setHasMore(true);

    const filteredPosts = await fetchEventsPosts(1, category);

    setPosts(filteredPosts);
    setPage(2);

    setHasMore(filteredPosts.length === 5);
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      const initialPosts = await fetchEventsPosts(1);
      setPosts(initialPosts);
      setPage(2);
      setHasMore(initialPosts.length === 5);
    };

    initialLoad();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!searchWord) return posts;
    const lowerSearchWord = searchWord.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerSearchWord) || post.description.toLowerCase().includes(lowerSearchWord),
    );
  }, [posts, searchWord]);

  return (
    <>
      <div className="hidden m:block">
        <Calender />
      </div>
      <div className="w-full mb-4">
        <div className="flex items-center">
          <Image src="/assets/gif/run.gif" alt="Run Icon" width={20} height={20} className="w-5 h-5" priority />
          <p className="m-2 text-labelNormal">모집이 곧 종료돼요</p>
        </div>
        {isLoadingCarousel ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {Array.from({ length: isMobile ? 1 : 3 }).map((_, index) => (
              <CarouselLoader key={index} />
            ))}
          </div>
        ) : (
          <Carousel posts={carouselPosts} />
        )}
        <EventFilterBar selectedCategory={selectedCategory} onChange={handleEventFilterChange} />
        <EventsInfiniteScrollComponent posts={filteredPosts} hasMore={hasMore} loadMorePosts={loadMorePosts} />
      </div>
    </>
  );
};

export default EventsContent;

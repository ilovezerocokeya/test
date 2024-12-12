import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AdCard from "@/components/MainPage/AdCard/AdCard";
import loadingSpinner from "../../../assets/loadingSpinner.json";
import LottieAnimation from "@/components/Common/Loading/LottieAnimation";
import ItEventCardLong from "../../Common/Card/PostCard/ItEventCardLong";
import { Tables } from "@/types/supabase";

interface InfiniteScrollComponentProps {
  posts: Tables<"IT_Events">[];
  hasMore: boolean;
  loadMorePosts: () => Promise<void>;
}

const EventsInfiniteScrollComponent: React.FC<InfiniteScrollComponentProps> = ({
  posts = [],
  hasMore,
  loadMorePosts,
}) => {
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center items-center w-full" style={{ marginTop: "20px" }}>
          <LottieAnimation animationData={loadingSpinner} size="50px" />
        </div>
      }
      endMessage={<p style={{ textAlign: "center", color: "white" }}>모든 포스트를 불러왔습니다.</p>}
    >
      {posts.map((post, index) => (
        <React.Fragment key={`${post.event_id}_${index}`}>
          <ItEventCardLong post={post} />
          {(index + 1) % 5 === 0 && <AdCard key={`ad_${index}`} />}
        </React.Fragment>
      ))}
    </InfiniteScroll>
  );
};

export default EventsInfiniteScrollComponent;

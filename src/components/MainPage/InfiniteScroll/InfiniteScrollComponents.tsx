"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCardLong from "@/components/Common/Card/PostCard/PostCardLong";
import AdCard from "@/components/MainPage/AdCard/AdCard";
import loadingSpinner from "../../../assets/loadingSpinner.json";
import { PostWithUser } from "@/types/posts/Post.type";
import LottieAnimation from "@/components/Common/Loading/LottieAnimation";
import InitialLoadingWrapper from "@/components/Common/Loading/InitialLoadingWrapper";

interface InfiniteScrollComponentProps {
  posts: PostWithUser[];
  hasMore: boolean;
  loadMorePosts: () => Promise<void>;
}

const InfiniteScrollComponent: React.FC<InfiniteScrollComponentProps> = ({ posts = [], hasMore, loadMorePosts }) => {
  return (
    <InitialLoadingWrapper>
      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "white" }}>해당 조건에 맞는 게시물이 없습니다</p>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center w-full">
              <LottieAnimation animationData={loadingSpinner} size="50px" />
            </div>
          }
          endMessage={<p style={{ textAlign: "center", color: "white" }}>모든 포스트를 불러왔습니다</p>}
        >
          {posts.map((post, index) => (
            <React.Fragment key={`${post.post_id}_${index}`}>
              <PostCardLong post={post} />
              {(index + 1) % 5 === 0 && <AdCard key={`ad_${index}`} />}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      )}
    </InitialLoadingWrapper>
  );
};

export default InfiniteScrollComponent;

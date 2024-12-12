import React, { Suspense } from "react";
import StudiesContent from "@/components/MainPage/PageContent/StudiesContent";
import { fetchPostsWithDeadLine } from "@/lib/fetchPosts";

const StudiesPage = async () => {
  const posts = await fetchPostsWithDeadLine(14, "스터디");
  if (!posts || posts.length === 0) {
    return <div>포스트를 불러오는 중 문제가 발생했습니다.</div>;
  }

  return (
    <Suspense>
      <StudiesContent initialPosts={posts} />
    </Suspense>
  );
};

export default StudiesPage;

import React, { Suspense } from "react";
import ProjectContent from "@/components/MainPage/PageContent/ProjectContent";
import { fetchPostsWithDeadLine } from "@/lib/fetchPosts";

const ProjectsPage = async () => {
  const posts = await fetchPostsWithDeadLine(14, "프로젝트");
  if (!posts || posts.length === 0) {
    return <div>포스트를 불러오는 중 문제가 발생했습니다.</div>;
  }

  return (
    <Suspense>
      <ProjectContent initialPosts={posts} />
    </Suspense>
  );
};

export default ProjectsPage;

import React, { Suspense } from "react";
import AllContent from "@/components/MainPage/PageContent/AllContent";

const AllPage = async () => {
  return (
    <Suspense>
      <AllContent />
    </Suspense>
  );
};

export default AllPage;

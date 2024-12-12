// import { useState, useEffect, useCallback } from 'react';
// import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
// import axios from 'axios';

// // 무한 스크롤 훅
// const useInfiniteScroll = () => {
//   const queryClient = useQueryClient();

//   // useInfiniteQuery로 무한 스크롤 데이터를 가져옴
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     status,
//     error,
//   } = useInfiniteQuery(
//     ['gatherHub'],
//     async ({ pageParam = 1 }) => {
//       const res = await axios.get(`http://localhost:3000/gatherHub?page=${pageParam}`);
//       return res.data;
//     },
//     {
//       getNextPageParam: (lastPage, pages) => {
//         if (lastPage.hasMore) {
//           return pages.length + 1;
//         }
//         return undefined;
//       },
//     }
//   );

//   // 스크롤 이벤트 처리
//   const handleScroll = useCallback(() => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop !==
//       document.documentElement.offsetHeight ||
//       isFetchingNextPage ||
//       !hasNextPage
//     ) {
//       return;
//     }
//     fetchNextPage();
//   }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   return { data, isFetchingNextPage, status, error };
// };
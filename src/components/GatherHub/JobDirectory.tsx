"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useUser } from '@/provider/UserContextProvider';
import { createPortal } from 'react-dom';

// 동적 로딩 설정
const LoginForm = dynamic(() => import('../Login/LoginForm'), {
  ssr: false,
  loading: () => <div>Loading...</div> 
});

interface JobDirectoryProps {
  setFilteredJob: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

const JobDirectory: React.FC<JobDirectoryProps> = ({ setFilteredJob, className }) => {
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const router = useRouter();
  const { isAuthenticated, userData } = useUser();
  
  // Hub 등록 여부를 useMemo로 캐싱
  const isHubRegistered = useMemo(() => userData?.hubCard || false, [userData]);

  // 직업군 리스트 캐싱
  const jobCategories = useMemo(() => [
    { name: '전체보기', value: 'all', hoverClass: 'hover:bg-primary hover:text-black text-black' },
    { name: '프론트엔드', value: '프론트엔드', hoverClass: 'hover:bg-primaryStrong hover:text-black' },
    { name: '백엔드', value: '백엔드', hoverClass: 'hover:bg-accentOrange hover:text-black' },
    { name: 'IOS', value: 'IOS', hoverClass: 'hover:bg-accentMaya hover:text-black' },
    { name: '안드로이드', value: '안드로이드', hoverClass: 'hover:bg-accentPurple hover:text-black' },
    { name: '데브옵스', value: '데브옵스', hoverClass: 'hover:bg-accentRed hover:text-black' },
    { name: '디자인', value: '디자인', hoverClass: 'hover:bg-accentMint hover:text-black' },
    { name: 'PM', value: 'PM', hoverClass: 'hover:bg-accentColumbia hover:text-black' },
    { name: '기획', value: '기획', hoverClass: 'hover:bg-accentPink hover:text-black' },
    { name: '마케팅', value: '마케팅', hoverClass: 'hover:bg-accentYellow hover:text-black' }
  ], []);

  // 로컬 스토리지 접근 최적화
  const storedJob = useMemo(() => localStorage.getItem('selectedJob') || 'all', []);
  
  // // 로컬 스토리지에서 직업군 상태 불러오기
  // useEffect(() => {
  //   setSelectedJob(storedJob);
  //   setFilteredJob(storedJob);
  // }, [storedJob, setFilteredJob]);

  // 직업군 선택 핸들러
  const handleSelectJob = useCallback((jobValue: string) => {
    setSelectedJob(jobValue);
    setFilteredJob(jobValue);
    localStorage.setItem('selectedJob', jobValue);
  }, [setFilteredJob]);

  const [hoveredJob, setHoveredJob] = useState<string | null>(null);

  // Hub 등록 카드 추가 버튼 핸들러
  const handleAddCard = useCallback(() => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      router.push(isHubRegistered ? '/mypage/' : '/mypage');
    }
  }, [isAuthenticated, isHubRegistered, router]);
  
  // 로그인 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseLoginModal = useCallback(() => setIsModalOpen(false), []);

  // 모달이 열렸을 때 Esc 키로 닫기
  useEffect(() => {
    if (isModalOpen) {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleCloseLoginModal();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isModalOpen, handleCloseLoginModal]);


  return (
    <aside className={`${className} p-1 rounded-lg sticky top-4 user-select-none`} style={{ userSelect: 'none' }}>
      {/* 큰 화면에서는 리스트로 */}
      <ul className="hidden lg:block job-list flex-col gap-1 justify-start item-start rounded-[20px] bg-fillStrong p-5 space-y-2 shadow mt-6 mb-6 w-[120px] h-[445px]"
        style={{ minHeight: '500px', paddingTop: '20px', paddingBottom: '20px' }}
      >
      {jobCategories.map((job, index) => (
        <li
          key={job.value}
          className={`job-item flex items-center justify-start
            ${selectedJob === job.value ? 'bg-background text-primary font-bold' : 'text-gray-400'} 
            ${job.value === 'all' && hoveredJob !== 'all' ? '' : 'hover:bg-background hover:text-primary'} 
            cursor-pointer rounded-lg p-4 transition-all duration-300`}
          onClick={() => handleSelectJob(job.value)}
          onMouseEnter={() => setHoveredJob(job.value)}
          onMouseLeave={() => setHoveredJob(null)}
          style={{ userSelect: 'none', width: '100%' }} 
        >
          {selectedJob === job.value  && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary transform rotate-180 translate-x-[10px]" 
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {/* 직업 이름 */}
          <span className={`flex-grow text-center ${selectedJob === job.value ? 'text-primary' : ''}`}>
            {job.name}
          </span> {/* 중앙 배치 및 선택된 항목에 primary 색상 유지 */}
        </li>
      ))}
    </ul>
  
  {/* Hub 등록 버튼 (작은 화면용) */}
  <button
    className="fixed bottom-10 right-5 w-14 h-14 bg-fillStrong text-primary text-xl 
    rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 ease-out 
    hover:scale-120 active:scale-95 hover:bg-fillLight cursor-pointer floating-icon lg:hidden"
    onClick={handleAddCard}
    style={{
      zIndex: 1000,
      userSelect: 'none', 
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 m-auto text-bright"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  </button>
  
  {/* 작은 화면에서는 셀렉트 박스로 */}
  <div className="block lg:hidden">
    <select
      className="p-2 text-xl bg-black text-white rounded-lg w-full border border-gray-500 transition-all duration-300 ease-in-out focus:border-blue-500 focus:bg-gray-800 hover:bg-gray-900"
      value={selectedJob}
      onChange={(e) => handleSelectJob(e.target.value)}
      style={{ userSelect: 'none' }}
    >
      {jobCategories.map((job) => (
        <option key={job.value} value={job.value}>
          {job.name}
        </option>
      ))}
    </select>
  </div>

  {/* Hub 등록 버튼 (큰 화면용) */}
  <div className="hidden lg:block relative group">
    <button
      className="fixed bottom-[40px] right-10 w-14 h-14 bg-fillStrong text-primary text-xl 
                rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 ease-out 
                hover:scale-120 active:scale-95 hover:animate-bounce hover:bg-fillLight cursor-pointer"
      onClick={handleAddCard}
      style={{
      zIndex: 1000,
      userSelect: 'none',
    }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 m-auto text-bright"
      >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
      </svg>
    </button>
    {/* 말풍선 */}
      <div className="fixed bottom-[120px] right-10 w-[150px] px-3 py-2 bg-yellow-500 text-black text-sm text-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
        Hub멤버가 되기 위해 <br /> 카드를 등록해주세요
        <div className="absolute bottom-[-8px] right-2 transform -translate-x-1/2 w-3 h-3 bg-yellow-500 rotate-45"></div>
      </div>
  </div>

  {/* 로그인 모달 */}
  {isModalOpen && createPortal(
    <>
      <div className="fixed inset-0 bg-black opacity-80 z-40" onClick={handleCloseLoginModal} style={{ userSelect: 'none' }}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-[20px] p-4 z-50" onClick={(e) => e.stopPropagation()} style={{ userSelect: 'none' }}>
        <button
          onClick={handleCloseLoginModal}
          className="ml-auto mt-1 mr-1 block text-right p-1 text-3xl text-[fontWhite] hover:text-[#777]"
          style={{ userSelect: 'none' }}
        >
          &times;
        </button>
        <LoginForm />
      </div>
    </>,
    document.body
  )}
</aside>  );
};

export default JobDirectory;

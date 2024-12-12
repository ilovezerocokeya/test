import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/provider/ContextProvider';
import { useUser } from '@/provider/UserContextProvider';

const useSelectJob = () => {
  const { nextStep, setJob } = useUser();
  const [selectedJob, setSelectedJob] = useState<string>('');
  const router = useRouter();
  const { closeModal } = useModal();

  const handleJobSelection = (job_title: string) => {
    setSelectedJob(job_title);
    setJob(job_title);
    nextStep();
  };

  const handleSkip = () => {
    const confirmSkip = window.confirm("기본정보는 마이페이지에서 수정할 수 있습니다. 계속하시겠습니까?");
    
    if (confirmSkip) {
      closeModal();
      router.push('/');
    }
  };

  return {
    selectedJob,
    handleJobSelection,
    handleSkip,
  };
};

export default useSelectJob;
'use client';

import { useParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import { useProfile } from '@/query/profile';

const Resume = ({ className }) => {
  const params = useParams();

  const { data } = useProfile(params.userSlug);

  const resumeData = data?.data?.data?.profile?.user?.resume;

  const handleViewResumeClick = () => {
    window.open(resumeData, '_blank');
  };

  return (
    <div className={twMerge('rounded-lg bg-white px-4 py-5', className)}>
      <Text className="text-2xl font-bold">Resume</Text>
      <Button onClick={handleViewResumeClick} className="mt-3">
        View Resume
      </Button>
    </div>
  );
};

export default Resume;

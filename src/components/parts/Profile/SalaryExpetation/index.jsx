'use client';

import { useParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Text from '@/components/elements/Text';
import { useProfile } from '@/query/profile';

const SalaryExpectation = ({ className }) => {
  const params = useParams();

  const { data } = useProfile(params.userSlug);

  return (
    <div className={twMerge('flex gap-3 rounded-lg bg-white px-4 py-5', className)}>
      <div className="flex flex-1 flex-col gap-3">
        <Text className="text-2xl font-bold">Salary Expectation</Text>
        <Text typography="sm">{data?.data?.data?.profile?.user?.salaryExpectation}</Text>
      </div>
    </div>
  );
};

export default SalaryExpectation;

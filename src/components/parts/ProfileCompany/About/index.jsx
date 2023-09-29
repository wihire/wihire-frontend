'use client';

import { useParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import { useProfile } from '@/query/profile';

const About = () => {
  const params = useParams();

  const { data } = useProfile(params.companySlug);

  return (
    <div>
      <div className="flex flex-1 flex-col gap-3">
        <Text className="mb-2 text-2xl font-bold">About</Text>
        <Text className="text-base">{data?.data?.data?.profile?.company?.about}</Text>
      </div>
    </div>
  );
};

export default About;

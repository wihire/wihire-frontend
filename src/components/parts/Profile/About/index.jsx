'use client';

import { useParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import { useProfile } from '@/query/profile';

const About = () => {
  const params = useParams();

  const { data } = useProfile(params.userSlug);

  const dataAbout = data?.data?.data?.profile?.user?.about;

  return (
    <div>
      {dataAbout ? (
        <div className="flex gap-3 rounded-lg bg-white px-4 py-5">
          <div>
            <Text className="mb-3 text-2xl font-bold">About</Text>
            <Text>{data?.data?.data?.profile?.user?.about}</Text>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default About;

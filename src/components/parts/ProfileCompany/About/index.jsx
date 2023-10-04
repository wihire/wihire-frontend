'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import { useProfile } from '@/query/profile';

const About = () => {
  const params = useParams();

  const { data } = useProfile(params.profileSlug);
  const profile = useMemo(() => data?.data?.data?.profile, [data]);

  if (!profile?.company?.about) {
    return null;
  }

  return (
    <>
      <div className="divider" />

      <div>
        <Text as="h2" typography="h3" className="mb-2">
          About
        </Text>
        <Text>{profile.company.about}</Text>
      </div>
    </>
  );
};

export default About;

'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import WorkExperienciesUpdateForm from '@/components/parts/Profile/WorkExperienciesUpdateForm';
import { useProfile } from '@/query/profile';

const WorkExperienciesForm = () => {
  const params = useParams();

  const { data: profileData } = useProfile(params.profileSlug);

  const { profile } = useMemo(() => profileData?.data.data, [profileData]);

  return (
    <div>
      {profile?.user.workExperiencies.length > 0 ? (
        <div>
          {profile?.user.workExperiencies.map((workExperience) => (
            <WorkExperienciesUpdateForm key={workExperience.id} {...workExperience} />
          ))}
        </div>
      ) : (
        <Text>You don&apos;t have work experiencies</Text>
      )}
    </div>
  );
};

export default WorkExperienciesForm;

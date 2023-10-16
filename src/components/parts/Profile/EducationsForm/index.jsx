'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import EducationUpdateForm from '@/components/parts/Profile/EducationUpdateForm';
import { useProfile } from '@/query/profile';

const EducationsForm = () => {
  const params = useParams();

  const { data: profileData } = useProfile(params.profileSlug);

  const { profile } = useMemo(() => profileData?.data.data, [profileData]);

  return (
    <div>
      {profile?.user.educations.length > 0 ? (
        <div>
          {profile?.user.educations.map((education) => (
            <EducationUpdateForm key={education.id} {...education} />
          ))}
        </div>
      ) : (
        <Text>You don&apos;t have educations</Text>
      )}
    </div>
  );
};

export default EducationsForm;

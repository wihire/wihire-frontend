'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import SkillUpdateForm from '@/components/parts/Profile/SkillUpdateForm';
import { useProfile } from '@/query/profile';

const SkillsForm = () => {
  const params = useParams();

  const { data: profileData } = useProfile(params.profileSlug);

  const { profile } = useMemo(() => profileData?.data.data, [profileData]);

  return (
    <div>
      {profile?.user.skills.length > 0 ? (
        <div>
          {profile?.user.skills.map((skill) => (
            <SkillUpdateForm key={skill.id} {...skill} />
          ))}
        </div>
      ) : (
        <Text>You don&apos;t have skills</Text>
      )}
    </div>
  );
};

export default SkillsForm;

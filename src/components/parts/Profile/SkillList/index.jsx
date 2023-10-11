import { useSession } from 'next-auth/react';

import PencilIcon from '@/assets/icons/pencil_solid.svg';
import Button from '@/components/elements/Button';
import ProfileSection from '@/components/parts/Profile/ProfileSection';
import SkillCard from '@/components/parts/Profile/SkillCard';

const ListSkill = ({ profile, skills }) => {
  const { data: loggedData, status } = useSession();

  return (
    <ProfileSection
      title="Skills"
      rightButton={
        status === 'authenticated' && loggedData?.profile?.id === profile?.id ? (
          <Button href={`${profile.slug}/user/skills`} className="btn-ghost">
            <PencilIcon className="text-base" />
          </Button>
        ) : null
      }
    >
      <ul>
        {skills?.map((skill) => (
          <SkillCard key={skill.id} {...skill} />
        ))}
      </ul>
    </ProfileSection>
  );
};

export default ListSkill;

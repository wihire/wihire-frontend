import { useSession } from 'next-auth/react';

import PencilIcon from '@/assets/icons/pencil_solid.svg';
import Button from '@/components/elements/Button';
import ProfileSection from '@/components/parts/Profile/ProfileSection';
import WorkExperienceCard from '@/components/parts/Profile/WorkExperienceCard';

const ListWorkExperience = ({ profile, workExperiencies }) => {
  const { data: loggedData, status } = useSession();

  return (
    <ProfileSection
      title="Work Experiencies"
      rightButton={
        status === 'authenticated' && loggedData?.profile?.id === profile?.id ? (
          <Button href={`${profile.slug}/user/work-experiencies`} className="btn-ghost">
            <PencilIcon className="text-base" />
          </Button>
        ) : null
      }
    >
      {workExperiencies?.map((workExperience, index) => (
        <>
          {index !== 0 ? <div className="divider" /> : null}
          <WorkExperienceCard key={workExperience.id} {...workExperience} />
        </>
      ))}
    </ProfileSection>
  );
};

export default ListWorkExperience;

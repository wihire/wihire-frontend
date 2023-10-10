import { useSession } from 'next-auth/react';

import PencilIcon from '@/assets/icons/pencil_solid.svg';
import Button from '@/components/elements/Button';
import EducationCard from '@/components/parts/Profile/EducationCard';
import ProfileSection from '@/components/parts/Profile/ProfileSection';

const ListEducation = ({ profile, educations }) => {
  const { data: loggedData, status } = useSession();

  return (
    <ProfileSection
      title="Educations"
      rightButton={
        status === 'authenticated' && loggedData?.profile?.id === profile?.id ? (
          <Button href={`${profile.slug}/user/educations`} className="btn-ghost">
            <PencilIcon className="text-base" />
          </Button>
        ) : null
      }
    >
      {educations?.map((education, index) => (
        <>
          {index !== 0 ? <div className="divider" /> : null}
          <EducationCard key={education.id} {...education} />
        </>
      ))}
    </ProfileSection>
  );
};

export default ListEducation;

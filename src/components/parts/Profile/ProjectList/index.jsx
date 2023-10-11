import { useSession } from 'next-auth/react';

import PencilIcon from '@/assets/icons/pencil_solid.svg';
import Button from '@/components/elements/Button';
import ProfileSection from '@/components/parts/Profile/ProfileSection';
import ProjectCard from '@/components/parts/Profile/ProjectCard';

const ListProject = ({ profile, projects }) => {
  const { data: loggedData, status } = useSession();

  return (
    <ProfileSection
      title="Projects"
      rightButton={
        status === 'authenticated' && loggedData?.profile?.id === profile?.id ? (
          <Button href={`${profile.slug}/user/projects`} className="btn-ghost">
            <PencilIcon className="text-base" />
          </Button>
        ) : null
      }
    >
      {projects?.map((project, index) => (
        <>
          {index !== 0 ? <div className="divider" /> : null}
          <ProjectCard key={project.id} {...project} />
        </>
      ))}
    </ProfileSection>
  );
};

export default ListProject;

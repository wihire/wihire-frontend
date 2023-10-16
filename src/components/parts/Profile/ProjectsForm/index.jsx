'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import ProjectUpdateForm from '@/components/parts/Profile/ProjectUpdateForm';
import { useProfile } from '@/query/profile';

const ProjectsForm = () => {
  const params = useParams();

  const { data: profileData } = useProfile(params.profileSlug);

  const { profile } = useMemo(() => profileData?.data.data, [profileData]);

  return (
    <div>
      {profile?.user.projects.length > 0 ? (
        <div>
          {profile?.user.projects.map((project) => (
            <ProjectUpdateForm key={project.id} {...project} />
          ))}
        </div>
      ) : (
        <Text>You don&apos;t have projects</Text>
      )}
    </div>
  );
};

export default ProjectsForm;

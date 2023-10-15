'use client';

import { useCallback, useState } from 'react';

import { useParams } from 'next/navigation';

import BackButton from '@/components/elements/BackButton';
import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import ModalCreateProjectForm from '@/components/parts/Profile/ModalCreateProjectForm';
import ProjectsForm from '@/components/parts/Profile/ProjectsForm';

const UserProject = () => {
  const params = useParams();
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

  const handleOpenModalCreate = useCallback(() => {
    setIsOpenModalCreate(true);
  }, []);

  const handleCloseModalCreate = useCallback(() => {
    setIsOpenModalCreate(false);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <BackButton
          backUrl={`/profile/${params.profileSlug}`}
          rightContent={
            <Text as="h1" typography="h2">
              Projects
            </Text>
          }
        />

        <Button onClick={handleOpenModalCreate} className="btn-square">
          +
        </Button>
      </div>

      <ProjectsForm />

      <ModalCreateProjectForm isOpen={isOpenModalCreate} onClose={handleCloseModalCreate} />
    </div>
  );
};

export default UserProject;

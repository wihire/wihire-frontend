'use client';

import { useCallback, useState } from 'react';

import { useParams } from 'next/navigation';

import BackButton from '@/components/elements/BackButton';
import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
// eslint-disable-next-line max-len
import ModalCreateWorkExperienceForm from '@/components/parts/Profile/ModalCreateWorkExperienceForm';
import WorkExperienciesForm from '@/components/parts/Profile/WorkExperienciesForm';

const UserWorkExperience = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const params = useParams();

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
              Work Experiencies
            </Text>
          }
        />

        <Button onClick={handleOpenModalCreate} className="btn-square">
          +
        </Button>
      </div>

      <WorkExperienciesForm />

      <ModalCreateWorkExperienceForm isOpen={isOpenModalCreate} onClose={handleCloseModalCreate} />
    </div>
  );
};

export default UserWorkExperience;

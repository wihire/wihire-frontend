'use client';

import { useCallback, useState } from 'react';

import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import ModalCreateSkillForm from '@/components/parts/Profile/ModalCreateSkillForm';
import SkillsForm from '@/components/parts/Profile/SkillsForm';

const UserSkill = () => {
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
        <Text as="h1" typography="h2">
          Skills
        </Text>

        <Button onClick={handleOpenModalCreate} className="btn-square">
          +
        </Button>
      </div>

      <SkillsForm />

      <ModalCreateSkillForm isOpen={isOpenModalCreate} onClose={handleCloseModalCreate} />
    </div>
  );
};

export default UserSkill;

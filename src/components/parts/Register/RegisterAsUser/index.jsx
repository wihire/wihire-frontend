'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';

import registerJobSeekerImage from '@/assets/images/illustrations/hiring.png';
import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import ModalRegisterUser from '@/components/parts/Register/ModalRegisterUser';

const RegisterAsUser = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <>
      <div
        className="flex w-full flex-col items-center justify-center 
      gap-10 bg-white py-5 text-center"
      >
        <Image
          width={200}
          height={200}
          src={registerJobSeekerImage}
          alt="Register as user"
          priority
        />

        <div>
          <Text as="h2" typography="h1" className="mb-4">
            For Job Seeker
          </Text>
          <Text typography="md" className="mx-auto w-3/4">
            Create your company account and search for suitable candidates
          </Text>
        </div>

        <Button className="btn-outline" onClick={handleOpenModal}>
          REGISTER AS JOB SEEKER
        </Button>
      </div>

      <ModalRegisterUser isOpen={isOpenModal} onClose={handleCloseModal} />
    </>
  );
};

export default RegisterAsUser;

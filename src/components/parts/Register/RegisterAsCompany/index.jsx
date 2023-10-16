'use client';

import { useCallback, useState } from 'react';

import registerCompanyImage from '@/assets/images/illustrations/company.png';
import Button from '@/components/elements/Button';
import Image from '@/components/elements/Image';
import Text from '@/components/elements/Text';
import ModalRegisterAsCompany from '@/components/parts/Register/ModalRegisterCompany';

const RegisterAsCompany = () => {
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
          gap-10 bg-primary-content py-10 text-center"
      >
        <Image
          width={200}
          height={200}
          src={registerCompanyImage}
          alt="Register as company"
          priority
        />

        <div>
          <Text as="h2" typography="h1" className="mb-4">
            For Company
          </Text>
          <Text typography="md" className="mx-auto w-3/4">
            Create your company account and search for suitable candidates
          </Text>
        </div>

        <Button onClick={handleOpenModal}>REGISTER AS JOB COMPANY</Button>
      </div>

      <ModalRegisterAsCompany isOpen={isOpenModal} onClose={handleCloseModal} />
    </>
  );
};

export default RegisterAsCompany;

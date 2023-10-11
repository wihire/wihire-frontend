'use client';

import { useCallback, useState } from 'react';

import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import CertificatesForm from '@/components/parts/Profile/CertificatesForm';
import ModalCreateCertificateForm from '@/components/parts/Profile/ModalCreateCertificateForm';

const UserCertificate = () => {
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
          Certificates
        </Text>

        <Button onClick={handleOpenModalCreate} className="btn-square">
          +
        </Button>
      </div>

      <CertificatesForm />

      <ModalCreateCertificateForm isOpen={isOpenModalCreate} onClose={handleCloseModalCreate} />
    </div>
  );
};

export default UserCertificate;

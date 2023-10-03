'use client';

import { useCallback, useState } from 'react';

import { useParams } from 'next/navigation';

import Button from '@/components/elements/Button';
import ModalDeleteConfiration from '@/components/parts/Jobs/ModalDeleteConfirmation';

export const ButtonsCompanyActions = () => {
  const params = useParams();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <div className="mb-5 flex justify-end gap-3">
      <Button href={`/jobs/${params.slug}/edit`} className="btn-warning">
        EDIT
      </Button>
      <Button onClick={handleOpenModal} className="btn-error">
        DELETE
      </Button>

      <ModalDeleteConfiration isOpen={isOpenModal} onClose={handleCloseModal} />
    </div>
  );
};

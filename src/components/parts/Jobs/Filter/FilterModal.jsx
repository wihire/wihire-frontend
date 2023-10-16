import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-modern-modal';

import FilterIcon from '@/assets/icons/adjustments-horizontal.svg';
import Button from '@/components/elements/Button';
import JobTypeFilter from '@/components/parts/Jobs/JobTypeFilter';
import PlaceMethodFilter from '@/components/parts/Jobs/PlaceMethodFilter';
import SalaryFilter from '@/components/parts/Jobs/SalaryFilter';
import SkillsFilter from '@/components/parts/Jobs/SkillsFilter';

import './styles.scss';

const FilterModal = () => {
  const router = useRouter();
  const [isOpen, setIsopen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsopen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsopen(false);
  }, []);

  const clearAll = useCallback(() => {
    handleCloseModal();
    router.push('/');
  }, [handleCloseModal, router]);

  return (
    <div className="flex justify-end md:hidden">
      <Button onClick={handleOpenModal} className="btn-square">
        <FilterIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal} backdropBlur scrollBehaviour="outside">
        <ModalHeader>Filters</ModalHeader>

        <ModalBody>
          <JobTypeFilter />
          <PlaceMethodFilter />
          <SkillsFilter />
          <SalaryFilter />
        </ModalBody>

        <ModalFooter>
          <Button onClick={clearAll}>Clear All</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default FilterModal;

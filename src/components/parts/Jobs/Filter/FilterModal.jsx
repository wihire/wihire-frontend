import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-modern-modal';

import FilterIcon from '@/assets/icons/adjustments-horizontal.svg';
import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import JobTypeFilter from '@/components/parts/Jobs/JobTypeFilter';
import PlaceMethodFilter from '@/components/parts/Jobs/PlaceMethodFilter';
import SalaryFilter from '@/components/parts/Jobs/SalaryFilter';
import SkillsFilter from '@/components/parts/Jobs/SkillsFilter';

import './styles.scss';

const FilterModal = () => {
  const router = useRouter();
  const [isOpen, setIsopen] = useState(false);
  // const [clear, setClear] = useState(false);
  const handleClick = () => {
    if (isOpen === false) {
      setIsopen(true);
    } else {
      setIsopen(false);
    }
  };

  const clearAll = () => {
    // setTimeout(setClear(true), 2000)

    // router.refresh()
    handleClick();
    router.push('/');
    //   setTimeout(setClear(false), 2000)
  };
  return (
    <div className="flex justify-center md:hidden">
      <Button onClick={handleClick}>
        <FilterIcon />
      </Button>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={handleClick} backdropBlur scrollBehaviour="outside">
          <ModalHeader>
            <Text>Filters</Text>
          </ModalHeader>

          <ModalBody>
            <JobTypeFilter className="col-span-12" cleared={isOpen} />
            <PlaceMethodFilter className="col-span-12" />
            <SkillsFilter className="col-span-12" />
            <SalaryFilter className="col-span-12 " />
          </ModalBody>

          <ModalFooter>
            <Button onClick={clearAll}>Clear All</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default FilterModal;

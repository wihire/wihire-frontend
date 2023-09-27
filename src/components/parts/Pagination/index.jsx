'use client';

import { useMemo } from 'react';

import ChevronDoubleLeftIcon from '@/assets/icons/chevron-double-left.svg';
import ChevronDoubleRightIcon from '@/assets/icons/chevron-double-right.svg';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import Button from '@/components/elements/Button';
import Select from '@/components/elements/Select';

const Pagination = ({
  maxPage,
  currentPage = 1,
  onNextPage,
  onPrevPage,
  onFirstPage,
  onLastPage,
  onChangePage
}) => {
  const buttonClassName = useMemo(
    () => 'bg-white border-white text-primary hover:border-white hover:bg-gray-100 join-item',
    []
  );

  return (
    <div className="join">
      <Button title="To first page" className={buttonClassName} onClick={onFirstPage}>
        <ChevronDoubleLeftIcon />
      </Button>
      <Button title="To previous page" className={buttonClassName} onClick={onPrevPage}>
        <ChevronLeftIcon />
      </Button>

      <Select
        value={currentPage}
        options={Array.from({ length: maxPage }, (_, i) => ({
          value: i + 1,
          label: i + 1
        }))}
        className="join-item border-none"
        onChange={onChangePage}
      />

      <Button title="To next page" className={buttonClassName} onClick={onNextPage}>
        <ChevronRightIcon />
      </Button>
      <Button title="To last page" className={buttonClassName} onClick={onLastPage}>
        <ChevronDoubleRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;

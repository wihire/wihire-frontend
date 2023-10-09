'use client';

import { useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

import ChevronDoubleLeftIcon from '@/assets/icons/chevron-double-left.svg';
import ChevronDoubleRightIcon from '@/assets/icons/chevron-double-right.svg';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import Button from '@/components/elements/Button';

const Pagination = ({
  maxPage,
  currentPage = 1,
  onNextPage,
  onPrevPage,
  onFirstPage,
  onLastPage,
  onChangePage,
  disabledNextPage,
  disabledPrevPage,
  className
}) => {
  const buttonClassName = useMemo(
    () => 'bg-white border-white text-primary hover:border-white hover:bg-gray-100 join-item',
    []
  );

  return (
    <div className={twMerge('join', className)}>
      <Button
        title="To first page"
        className={buttonClassName}
        onClick={onFirstPage}
        disabled={currentPage === 1}
      >
        <ChevronDoubleLeftIcon />
      </Button>
      <Button
        title="To previous page"
        className={buttonClassName}
        onClick={onPrevPage}
        disabled={disabledPrevPage}
      >
        <ChevronLeftIcon />
      </Button>

      <select
        className="select join-item select-bordered w-full max-w-xs border-none"
        value={currentPage}
        onChange={onChangePage}
        title="Current page"
      >
        {Array.from({ length: maxPage }, (_, i) => (
          <option value={i + 1} key={i}>
            {i + 1}
          </option>
        ))}
      </select>

      <Button
        title="To next page"
        className={buttonClassName}
        onClick={onNextPage}
        disabled={disabledNextPage}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        title="To last page"
        className={buttonClassName}
        onClick={onLastPage}
        disabled={currentPage === maxPage}
      >
        <ChevronDoubleRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;

'use client';

import { useCallback } from 'react';

import cx from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/elements/Button';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const STATUS = ['Posted', 'Closed'];

const StatusFilter = () => {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status');

  const router = useRouter();

  const isActive = useCallback(
    (status) => {
      if (!['POSTED', 'CLOSED'].includes(currentStatus) && status === 'POSTED') {
        return true;
      }

      return currentStatus === status;
    },
    [currentStatus]
  );

  const handleClick = useCallback(
    (status) => {
      if (status === currentStatus || (!status && !currentStatus)) {
        return;
      }

      const newSearchParamsRemoved = removeSearchParams(searchParams, ['status', 'page']);

      let newSearchParams = newSearchParamsRemoved;

      if (status) {
        newSearchParams = combineSearchParams(newSearchParams, { status });
      }

      router.push(`?${newSearchParams.toString()}`);
    },
    [currentStatus, router, searchParams]
  );

  return (
    <div className="flex gap-3">
      {STATUS.map((status) => (
        <Button
          key={status}
          className={twMerge(
            cx('btn-sm rounded-full no-animation normal-case', {
              'btn-outline': !isActive(status.toUpperCase())
            })
          )}
          onClick={() => handleClick(status.toUpperCase())}
        >
          {status}
        </Button>
      ))}
    </div>
  );
};

export default StatusFilter;

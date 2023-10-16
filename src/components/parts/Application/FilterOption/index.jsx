'use client';

import { useCallback, useMemo } from 'react';

import cx from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/elements/Button';
import { combineSearchParams, removeSearchParams } from '@/lib/url';

const FilterOption = ({ status, label, className }) => {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status');

  const router = useRouter();

  const isActive = useMemo(() => currentStatus === status, [currentStatus, status]);

  const handleClick = useCallback(() => {
    if (status === currentStatus || (!status && !currentStatus)) {
      return;
    }

    const newSearchParamsRemoved = removeSearchParams(searchParams, ['status', 'page']);

    let newSearchParams = newSearchParamsRemoved;

    if (status) {
      newSearchParams = combineSearchParams(newSearchParams, { status });
    }

    router.push(`?${newSearchParams.toString()}`);
  }, [currentStatus, router, searchParams, status]);

  return (
    <Button
      className={twMerge(
        cx(
          'btn-sm rounded-full no-animation normal-case',
          {
            'btn-outline': !isActive
          },
          className
        )
      )}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

export default FilterOption;

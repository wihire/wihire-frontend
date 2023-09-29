'use client';

import { useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/elements/Button';
import { splitStatus } from '@/lib/common';

const FilterOptions = ({ url, status }) => {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status');

  const router = useRouter();

  const isActive = useMemo(() => currentStatus === status, [currentStatus, status]);

  const buttonClassName = useMemo(() => {
    if (!isActive) {
      return 'btn-outline';
    }
    return null;
  }, [isActive]);

  return (
    <Button
      className={twMerge('btn-sm rounded-full no-animation', buttonClassName)}
      onClick={() => router.push(`${url}`)}
    >
      {!status ? 'All' : splitStatus(status)}
    </Button>
  );
};

export default FilterOptions;

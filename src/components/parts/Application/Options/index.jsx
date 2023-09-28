'use client';

import { useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/elements/Button';

const FilterOptions = ({ title, url }) => {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const router = useRouter();

  const isActive = useMemo(() => status === url, [status, url]);

  const buttonClassName = useMemo(() => {
    if (!isActive) {
      return 'btn-outline';
    }
    return '';
  }, [isActive]);

  return (
    <Button
      className={twMerge('btn-sm rounded-full', buttonClassName)}
      onClick={() => router.push(`?status=${url}`)}
    >
      {title}
    </Button>
  );
};

export default FilterOptions;

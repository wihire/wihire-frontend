'use client';

import { useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

import Text from '@/components/elements/Text';
import { APPLICATION_STATUS } from '@/lib/constants/common';

const ApplicationStatusBadge = ({ status }) => {
  const badgeClassName = useMemo(() => {
    switch (status) {
      case 'ONPROGRESS':
        return 'border border-primary';
      case 'ONREVIEW':
        return 'bg-warning';
      case 'APPROVED':
        return 'bg-success';
      default:
        return 'bg-error';
    }
  }, [status]);

  const badgeTextClassName = useMemo(() => {
    if (status === 'ONPROGRESS') {
      return 'text-primary';
    }
    return 'text-white';
  }, [status]);

  return (
    <div className={twMerge('rounded-full px-4 py-1', badgeClassName)}>
      <Text className={badgeTextClassName}>{APPLICATION_STATUS[status]}</Text>
    </div>
  );
};

export default ApplicationStatusBadge;

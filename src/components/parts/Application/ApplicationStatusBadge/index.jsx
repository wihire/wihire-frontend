'use client';

import { useMemo } from 'react';

import cx from 'classnames';
import { twMerge } from 'tailwind-merge';

import Text from '@/components/elements/Text';
import { APPLICATION_STATUS } from '@/lib/constants/common';

const ApplicationStatusBadge = ({ status, withMobileVer }) => {
  const badgeClassName = useMemo(() => {
    switch (status) {
      case 'ONPROGRESS':
        return 'bg-white border border-primary';
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
    <div
      className={twMerge(
        cx('rounded-full px-4 py-1', badgeClassName, {
          'tooltip tooltip-left md:inline px-2 md:px-4 py-2 md:py-1': withMobileVer
        })
      )}
      data-tip={APPLICATION_STATUS[status]}
    >
      <Text
        className={cx(badgeTextClassName, {
          'hidden md:inline': withMobileVer
        })}
      >
        {APPLICATION_STATUS[status]}
      </Text>
    </div>
  );
};

export default ApplicationStatusBadge;

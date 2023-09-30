'use client';

import { useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

import Text from '@/components/elements/Text';
import JobCard from '@/components/parts//Jobs/JobCard';
import { APPLICATION_STATUS } from '@/lib/constants/common';

const ApplicationCard = ({ ...props }) => {
  const badgeClassName = useMemo(() => {
    switch (props.status) {
      case 'ONPROGRESS':
        return 'border border-primary';
      case 'ONREVIEW':
        return 'bg-warning';
      case 'APPROVED':
        return 'bg-success';
      default:
        return 'bg-error';
    }
  }, [props.status]);

  const badgeTextClassName = useMemo(() => {
    if (props.status === 'ONPROGRESS') {
      return 'text-primary';
    }
    return 'text-white';
  }, [props.status]);

  return (
    <JobCard
      companyImage={props.job.company.profile.avatar}
      companyName={props.job.company.profile.name}
      renderRightContent={
        <div className={twMerge('rounded-full px-4 py-1', badgeClassName)}>
          <Text className={badgeTextClassName}>{APPLICATION_STATUS[props.status]}</Text>
        </div>
      }
      {...props.job}
    />
  );
};

export default ApplicationCard;

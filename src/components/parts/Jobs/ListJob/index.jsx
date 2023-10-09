import React from 'react';

import { twMerge } from 'tailwind-merge';

import JobCard from '@/components/parts/Jobs/JobCard';
import SaveJobCard from '@/components/parts/Jobs/SaveJobCard';

const ListJob = ({ jobs, className, cardType }) => {
  let Component = JobCard;

  if (cardType === 'save') {
    Component = SaveJobCard;
  }

  return (
    <div className={twMerge('mb-8 flex flex-col gap-[10px]', className)}>
      {jobs?.map((job) => (
        <Component
          key={job.id}
          companyImage={job.company.profile.avatar}
          companyName={job.company.profile.name}
          {...job}
        />
      ))}
    </div>
  );
};

export default ListJob;

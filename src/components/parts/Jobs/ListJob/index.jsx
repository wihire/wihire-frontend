import { twMerge } from 'tailwind-merge';

import SaveJobCard from '@/components/parts/Jobs/SaveJobCard';

const ListJob = ({ jobs, className }) => (
  <div className={twMerge('mb-8 flex flex-col gap-[10px]', className)}>
    {jobs?.map((job) => (
      <SaveJobCard
        key={job.id}
        companyImage={job.company.profile.avatar}
        companyName={job.company.profile.name}
        {...job}
      />
    ))}
  </div>
);

export default ListJob;

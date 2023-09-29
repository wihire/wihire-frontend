import JobCard from '@/components/parts/Jobs/JobCard';

const ListJob = ({ jobs }) => (
  <div className="my-8 flex flex-col gap-[10px]">
    {jobs?.map((job) => (
      <JobCard
        key={job.id}
        companyImage={job.company.profile.avatar}
        companyName={job.company.profile.name}
        {...job}
      />
    ))}
  </div>
);

export default ListJob;

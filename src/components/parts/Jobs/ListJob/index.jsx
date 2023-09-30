import SaveJobCard from '@/components/parts/Jobs/SaveJobCard';

const ListJob = ({ jobs }) => (
  <div className="my-8 flex flex-col gap-[10px]">
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

import JobDetailsButtons from '@/components/parts/Jobs/JobDetailsButtons';
import JobDetailsContent from '@/components/parts/Jobs/JobDetailsContent';
import JobDetailsHeader from '@/components/parts/Jobs/JobDetailsHeader';

const JobDetails = () => (
  <div className="rounded-md bg-white p-8">
    <JobDetailsHeader />

    <JobDetailsButtons />

    <div className="divider my-8" />

    <JobDetailsContent />
  </div>
);

export default JobDetails;

import { Hydrate, dehydrate } from '@tanstack/react-query';

import JobDetails from '@/components/pages/JobDetails';
import { default as generateOwnMetadata } from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getApplicantCheckKey } from '@/query/applications';
import { getJobKey } from '@/query/jobs';
import { applyJobCheck } from '@/repositories/applications';
import { getJob } from '@/repositories/jobs';

export async function generateMetadata({ params }) {
  const { slug } = params;

  const jobData = await getJob(slug);
  const { job } = jobData.data.data;

  return generateOwnMetadata(
    {
      title: `${job.title} at ${job.company.profile.name}`
    },
    {
      withSuffix: true
    }
  );
}

const JobDetailsPage = async ({ params }) => {
  const { slug } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getJobKey(slug), () => getJob(slug));
  await queryClient.prefetchQuery(getApplicantCheckKey(slug), () => applyJobCheck(slug));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <JobDetails />
    </Hydrate>
  );
};

export default JobDetailsPage;

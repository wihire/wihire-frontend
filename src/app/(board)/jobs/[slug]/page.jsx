import { Hydrate, dehydrate } from '@tanstack/react-query';

import JobDetails from '@/components/pages/JobDetails';
import { default as generateOwnMetadata } from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getJobKey } from '@/query/jobs';
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
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <JobDetails />
    </Hydrate>
  );
};

export default JobDetailsPage;

import { Hydrate, dehydrate } from '@tanstack/react-query';

import JobDetails from '@/components/pages/JobDetails';
import { getQueryClient } from '@/lib/queryClient';
import { getJobKey } from '@/query/jobs';
import { getJob } from '@/repositories/jobs';

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

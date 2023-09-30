import { Hydrate, dehydrate } from '@tanstack/react-query';

import SavedJobs from '@/components/pages/SavedJobs';
import generateMetadata from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getJobsKey } from '@/query/jobs';
import { getJobs } from '@/repositories/jobs';

export const metadata = generateMetadata(
  {
    title: 'Saved Jobs'
  },
  {
    withSuffix: true
  }
);

const SavedJobsPage = async ({ searchParams }) => {
  const queryClient = getQueryClient();

  const filter = {
    page: Number(searchParams?.page) || 1,
    'is-saved': true
  };

  await queryClient.prefetchQuery(getJobsKey(filter), () => getJobs(filter));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <SavedJobs />
    </Hydrate>
  );
};

export default SavedJobsPage;

import { Hydrate, dehydrate } from '@tanstack/react-query';

import Jobs from '@/components/pages/Jobs';
import generateMetadata from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getJobsKey } from '@/query/jobs';
import { getJobs } from '@/repositories/jobs';

export const metadata = generateMetadata(
  {
    title: 'Jobs Board'
  },
  {
    withSuffix: true
  }
);

const JobsPage = async ({ searchParams }) => {
  const queryClient = getQueryClient();

  const filter = {
    page: Number(searchParams?.page) || 1,
    'categories[]': searchParams?.['categories[]']?.length
      ? searchParams['categories[]']
      : undefined,
    title: searchParams?.title || undefined,
    company: searchParams?.company || undefined,
    'job-types[]': searchParams?.['job-types[]']?.length ? searchParams['job-types[]'] : undefined,
    'place-methods[]': searchParams?.['place-methods[]']?.length
      ? searchParams['place-methods[]']
      : undefined,
    'skills[]': searchParams?.['skills[]']?.length ? searchParams['skills[]'] : undefined,
    'min-salary': searchParams['min-salary'] || undefined,
    status: 'POSTED'
  };

  await queryClient.prefetchQuery(getJobsKey(filter), () => getJobs(filter));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Jobs />
    </Hydrate>
  );
};

export default JobsPage;

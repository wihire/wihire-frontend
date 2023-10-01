import { Hydrate, dehydrate } from '@tanstack/react-query';

import DraftedJobs from '@/components/pages/DraftedJobs';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getJobsKey } from '@/query/jobs';
import { getJobs } from '@/repositories/jobs';

export const metadata = generateMetadata(
  {
    title: 'Drafted Jobs'
  },
  {
    withSuffix: true
  }
);

const DraftsJobPage = async ({ searchParams }) => {
  const { name } = await pageAuthorization([ROLE.COMPANY]);

  const queryClient = getQueryClient();

  const filter = {
    page: Number(searchParams?.page) || 1,
    company: name,
    status: 'DRAFT'
  };

  await queryClient.prefetchQuery(getJobsKey(filter), () => getJobs(filter));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <DraftedJobs companyName={name} />
    </Hydrate>
  );
};

export default DraftsJobPage;

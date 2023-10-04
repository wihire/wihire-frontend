import { Hydrate, dehydrate } from '@tanstack/react-query';

import Applicants from '@/components/pages/Applicants';
import generateMetadata from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getApplicantsJobKey } from '@/query/jobs';
import { getApplicantsJob } from '@/repositories/jobs';

export const metadata = generateMetadata(
  {
    title: 'Applicants'
  },
  {
    withSuffix: true
  }
);

const ApplicantsPage = async ({ params, searchParams }) => {
  const { slug } = params;
  const queryClient = getQueryClient();

  const filter = {
    page: Number(searchParams?.page) || 1,
    status: searchParams?.status || undefined
  };

  await queryClient.prefetchQuery(getApplicantsJobKey(slug, filter), () =>
    getApplicantsJob(slug, filter)
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Applicants />
    </Hydrate>
  );
};

export default ApplicantsPage;

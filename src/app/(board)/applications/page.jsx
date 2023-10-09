import { Hydrate, dehydrate } from '@tanstack/react-query';

import Applications from '@/components/pages/Applications';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getApplicationsKeys } from '@/query/applications';
import { getApplications } from '@/repositories/applications';

export const metadata = generateMetadata(
  {
    title: 'Applications'
  },
  {
    withSuffix: true
  }
);

const ApplicationsPage = async ({ searchParams }) => {
  await pageAuthorization([ROLE.USER]);

  const queryClient = getQueryClient();

  const filter = {
    page: Number(searchParams?.page) || 1,
    status: searchParams?.status || undefined
  };

  await queryClient.prefetchQuery(getApplicationsKeys(filter), () => getApplications(filter));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Applications />
    </Hydrate>
  );
};

export default ApplicationsPage;

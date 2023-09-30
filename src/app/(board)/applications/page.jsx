import { Hydrate, dehydrate } from '@tanstack/react-query';

import Applications from '@/components/pages/Applications';
import { getQueryClient } from '@/lib/queryClient';
import { getApplicationsKeys } from '@/query/applications';
import { getApplications } from '@/repositories/applications';

const ApplicationsPage = async ({ searchParams }) => {
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

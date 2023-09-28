import { Hydrate, dehydrate } from '@tanstack/react-query';

import Application from '@/components/pages/Application';
import { getQueryClient } from '@/lib/queryClient';
import { getApplicationKeys } from '@/query/applications';
import { getApplications } from '@/repositories/applications';

const ApplicationsPage = async ({ searchParams }) => {
  const queryClient = getQueryClient();

  const filter = {
    page: Number(searchParams?.page) || 1,
    status: searchParams?.status || undefined
  };

  await queryClient.prefetchQuery(getApplicationKeys(filter), () => getApplications(filter));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Application />
    </Hydrate>
  );
};

export default ApplicationsPage;

import { useQuery } from '@tanstack/react-query';

import { getApplications } from '@/repositories/applications';

export const getApplicationsKeys = (filter) => ['applications', filter];

export const useApplications = (filter) => {
  const result = useQuery({
    queryKey: getApplicationsKeys(filter),
    queryFn: () => getApplications(filter),
    keepPreviousData: true
  });

  return result;
};

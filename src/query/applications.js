import { useQuery } from '@tanstack/react-query';

import { getApplications } from '@/repositories/applications';

export const getApplicationKeys = (filter) => ['application', filter];

export const useApplications = (filter) => {
  const result = useQuery({
    queryKey: getApplicationKeys(filter),
    queryFn: () => getApplications(filter),
    keepPreviousData: true
  });

  return result;
};

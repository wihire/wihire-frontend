import { useQuery } from '@tanstack/react-query';

import { getCompanyScopes } from '@/repositories/companyScope';

export const getCompanyScopesKey = (filters) => ['companyScopes', filters];

export const useCompanyScopes = (filters, queryOptions) => {
  const result = useQuery({
    queryKey: getCompanyScopesKey(filters),
    queryFn: () => getCompanyScopes(filters),
    ...queryOptions
  });

  return result;
};

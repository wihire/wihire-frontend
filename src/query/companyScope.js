import { useQuery } from '@tanstack/react-query';

import { getCompanyScopes } from '@/repositories/companyScope';

export const getCompanyScopesKey = (filters) => ['companyScopes', filters];

export const useCompanyScopes = (filters) => {
  const result = useQuery({
    queryKey: getCompanyScopesKey(filters),
    queryFn: () => getCompanyScopes(filters)
  });

  return result;
};

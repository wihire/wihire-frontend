import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/repositories/profile';

export const getProfileKey = (companySlug) => ['profile', companySlug];

export const useProfile = (companySlug) => {
  const result = useQuery({
    queryKey: getProfileKey(companySlug),
    queryFn: () => getProfile(companySlug)
  });

  return result;
};

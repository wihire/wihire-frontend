import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/repositories/profile';

export const getProfileKey = (profileSlug) => ['profile', profileSlug];

export const useProfile = (profileSlug) => {
  const result = useQuery({
    queryKey: getProfileKey(profileSlug),
    queryFn: () => getProfile(profileSlug)
  });

  return result;
};

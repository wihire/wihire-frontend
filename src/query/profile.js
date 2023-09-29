import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/repositories/profile';

export const getProfileKey = (userSlug) => ['profile', userSlug];

export const useProfile = (userSlug) => {
  const result = useQuery({
    queryKey: getProfileKey(userSlug),
    queryFn: () => getProfile(userSlug)
  });

  return result;
};

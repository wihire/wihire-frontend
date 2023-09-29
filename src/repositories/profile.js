import fetcher from '@/lib/fetcher';

export const getProfile = async (userSlug) => {
  const response = await fetcher({
    url: `/profile/${userSlug}`
  });

  return response;
};

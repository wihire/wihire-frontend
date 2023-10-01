import fetcher from '@/lib/fetcher';

export const getProfile = async (profileSlug) => {
  const response = await fetcher({
    url: `/profile/${profileSlug}`
  });

  return response;
};

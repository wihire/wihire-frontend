import fetcher from '@/lib/fetcher';

export const getProfile = async (companySlug) => {
  const response = await fetcher({
    url: `/profile/${companySlug}`
  });

  return response;
};

import fetcher from '@/lib/fetcher';

export const getJobDetails = async (slug) => {
  const response = await fetcher({
    url: `/jobs/${slug}`
  });
  return response;
};

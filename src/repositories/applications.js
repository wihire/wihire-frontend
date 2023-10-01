import fetcher from '@/lib/fetcher';

export const getApplications = async (filter) => {
  const response = await fetcher({
    url: '/applications',
    query: filter
  });

  return response;
};

export const applyJobCheck = async (slug) => {
  const response = await fetcher({
    url: `/applications/${slug}/check`
  });

  return response;
};

import fetcher from '@/lib/fetcher';

export const getJobs = async (filters) => {
  const response = await fetcher({
    url: '/jobs',
    query: filters
  });

  return response;
};

export const saveJob = async (slug) => {
  const response = await fetcher({
    url: `/jobs/${slug}/save`,
    method: 'POST'
  });

  return response;
};

export const unsaveJob = async (slug) => {
  const response = await fetcher({
    url: `/jobs/${slug}/unsave`,
    method: 'DELETE'
  });

  return response;
};

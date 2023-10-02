import fetcher from '@/lib/fetcher';

export const getJob = async (slug) => {
  const response = await fetcher({
    url: `/jobs/${slug}`
  });

  return response;
};

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

export const createJob = async (data) => {
  const response = await fetcher({
    url: `/jobs`,
    method: 'POST',
    body: JSON.stringify(data)
  });

  return response;
};

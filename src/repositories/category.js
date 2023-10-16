import fetcher from '@/lib/fetcher';

export const getCategories = async (filters) => {
  const response = await fetcher({
    url: '/categories',
    query: filters
  });

  return response;
};

export const getMostPopularCategory = async () => {
  const response = await fetcher({
    url: '/categories/most-seven'
  });

  return response;
};

import fetcher from '@/lib/fetcher';

export const getSkills = async (filters) => {
  const response = await fetcher({
    url: '/skills',
    query: filters
  });

  return response;
};

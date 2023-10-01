import fetcher from '@/lib/fetcher';

export const getCompanyScopes = async (filters) => {
  const response = await fetcher({
    url: '/company-scopes',
    query: filters
  });

  return response;
};

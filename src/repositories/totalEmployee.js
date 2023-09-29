import fetcher from '@/lib/fetcher';

export const getTotalEmployees = async () => {
  const response = await fetcher({
    url: '/total-employees'
  });

  return response;
};

import fetcher from '@/lib/fetcher';

export const getApplications = async (filter) => {
  const response = await fetcher({
    url: '/applications',
    query: filter
  });

  // console.log(response, "......................");
  return response;
};

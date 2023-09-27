import fetcher from '@/lib/fetcher';

export const login = async ({ email, password }) => {
  const response = await fetcher({
    url: '/auth/login',
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  return response;
};

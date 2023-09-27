import fetcher from '@/lib/fetcher';

export const login = async ({ email, password }) => {
  const response = await fetcher({
    url: '/auth/login',
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  return response;
};

export const forgotPassword = async ({ email }) => {
  const response = await fetcher({
    url: '/auth/forgot-password',
    method: 'POST',
    body: JSON.stringify({ email })
  });
  return response;
};

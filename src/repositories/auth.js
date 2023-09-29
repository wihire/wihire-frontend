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

export const registerCompany = async (payload) => {
  const response = await fetcher({
    url: '/auth/register/company',
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response;
};

export const registerUser = async (payload) => {
  const response = await fetcher({
    url: '/auth/register/user',
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response;
};

export const sendVerificationEmail = async (payload) => {
  const response = await fetcher({
    url: '/auth/email-verification',
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response;
};

export const verifyEmail = async (payload) => {
  const response = await fetcher({
    url: '/auth/verify-email',
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response;
};

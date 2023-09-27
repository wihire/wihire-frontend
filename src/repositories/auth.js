import fetcher from '@/lib/fetcher';

export const forgotChangePassword = async ({ token, newPassword, confirmNewPassword }) => {
  const response = await fetcher({
    url: '/auth/forgot-change-password',
    method: 'POST',
    body: JSON.stringify({ token, newPassword, confirmNewPassword })
  });

  if (!response.data.success) throw response;

  return response;
};

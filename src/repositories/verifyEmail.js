import fetcher from '@/lib/fetcher';

export const verifyEmail = async ({ email }) => {
  const response = await fetcher({
    url: '/auth/email-verification',
    method: 'POST',
    body: JSON.stringify({ email })
  });

  return response;
};

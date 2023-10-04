'use client';

import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import { setAccessToken } from '@/lib/cookies';
import { verifyEmail } from '@/repositories/auth';

const ERROR_MESSAGES = {
  VALIDATION_ERR: 'No token provided. Please check your email and try again.',
  TOKEN_ERR:
    // eslint-disable-next-line max-len
    'Invalid token. Please check your email and try again or login again to resend verification email.',
  TOKEN_EXPIRED_ERR: 'Token expired. Please login again to resend verification email.'
};

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const verifyEmailMutation = useMutation({
    mutationFn: () =>
      verifyEmail({
        token: searchParams.get('token')
      }),
    onSuccess: async ({ data }) => {
      setAccessToken(data.data.accessToken);

      const signInResponse = await signIn('credentials', {
        redirect: false,
        slug: data.data.profile.slug,
        accessToken: data.data.accessToken
      });

      if (signInResponse.error) {
        toast.error('Please login again');
        return;
      }

      router.replace('/jobs');
      router.refresh();
    },
    onError: () => {}
  });

  useEffect(() => {
    verifyEmailMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[500px] rounded-md border border-gray-100 p-14 text-center">
      {!verifyEmailMutation.isSuccess && !verifyEmailMutation.isError ? (
        <Text typography="h4">Verifying your email...</Text>
      ) : null}

      {verifyEmailMutation.isSuccess ? (
        <Text typography="h4">Directing to dashboard...</Text>
      ) : null}

      {verifyEmailMutation.isError ? (
        <>
          <Text typography="h4" className="text-error">
            {ERROR_MESSAGES[verifyEmailMutation.error.type] ?? verifyEmailMutation.error.message}
          </Text>

          <Button href="/login" className="btn-wide mt-5">
            Login
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default VerifyEmail;

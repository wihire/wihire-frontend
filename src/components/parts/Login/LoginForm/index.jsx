'use client';

import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import Logo from '@/components/elements/Logo';
import Text from '@/components/elements/Text';
import TextInput from '@/components/elements/TextInput';
import { EMAIL_REGEX } from '@/lib/constants/regex';
import { EMAIL_KEY } from '@/lib/constants/storageKey';
import { setAccessToken } from '@/lib/cookies';
import { login, sendVerificationEmail } from '@/repositories/auth';

const LoginForm = ({ className }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm();

  const sendVerificationEmailMutation = useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      router.push('/verification-email');
    }
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      if (!data.data.profile.isVerifiedEmail) {
        const email = getValues('email');

        setCookie(EMAIL_KEY, email, {
          maxAge: 60 // 1 minute
        });

        sendVerificationEmailMutation.mutate({
          email
        });

        return;
      }

      setAccessToken(data.data.accessToken);
      router.replace('/jobs');
    }
  });

  const onSubmit = useCallback(
    (data) => {
      loginMutation.mutate(data);
    },
    [loginMutation]
  );

  return (
    <div
      className={twMerge(
        'flex flex-col h-full w-full items-center justify-center rounded-lg p-8 bg-white',
        className
      )}
    >
      <div className="mb-10 mt-20 flex flex-col items-center gap-[84px]">
        <Logo />
        <Text typography="sm" className="text-neutral-400">
          Login to your account
        </Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FormControl label="Email" htmlFor="email" isBlock error={errors.email?.message}>
          <TextInput
            isBlock
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Email is not valid'
              }
            })}
          />
        </FormControl>

        <FormControl
          label="Password"
          htmlFor="password"
          isBlock
          error={errors.password?.message}
          descriptionAlt={
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot Password?
            </Link>
          }
          className="mt-3"
        >
          <TextInput
            isBlock
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required'
            })}
          />
        </FormControl>

        <Button
          type="submit"
          className="mt-10 w-full"
          isLoading={loginMutation.isLoading || sendVerificationEmailMutation.isLoading}
        >
          Login
        </Button>
      </form>

      <Text className="mt-auto text-gray-700">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-primary underline">
          Register
        </Link>
      </Text>
    </div>
  );
};

export default LoginForm;

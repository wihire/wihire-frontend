'use client';

import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import { EMAIL_REGEX } from '@/lib/constants/regex';
import { forgotPassword } from '@/repositories/auth';

const ForgotPasswordForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('Check your email to reset your password!');

      setTimeout(() => {
        router.replace('/login');
      }, 1000);
    },
    onError: (error) => {
      if (error.type === 'NOT_FOUND_ERR') {
        toast.error('Email is not registered');
        return;
      }

      toast.error(error.message);
    }
  });

  const onSubmit = useCallback(
    (data) => {
      forgotPasswordMutation.mutate(data);
    },
    [forgotPasswordMutation]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isBlock isRequired htmlFor="email" label="Email" error={errors.email?.message}>
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

      <Button type="submit" className="mt-10 w-full" isLoading={forgotPasswordMutation.isLoading}>
        SEND
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;

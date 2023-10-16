'use client';

import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import { forgotChangePassword } from '@/repositories/auth';

const ForgotChangePasswordForm = ({ token }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      token
    }
  });

  const changePasswordMutation = useMutation({
    mutationFn: forgotChangePassword,
    onSuccess: () => {
      toast.success('Update password success!');

      setTimeout(() => {
        router.replace('/login');
      }, 1000);
    }
  });

  const onSubmit = useCallback(
    (data) => {
      changePasswordMutation.mutate(data);
    },
    [changePasswordMutation]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        htmlFor="newPassword"
        label="New password"
        isBlock
        isRequired
        error={errors.newPassword?.message}
      >
        <TextInput
          id="newPassword"
          type="password"
          placeholder="Enter your new password"
          isBlock
          {...register('newPassword', {
            required: 'New password is required',
            minLength: {
              value: 8,
              message: 'New password must be at least 8 characters'
            }
          })}
        />
      </FormControl>

      <FormControl
        htmlFor="confirmNewPassword"
        label="Confirm new password"
        isBlock
        isRequired
        error={errors.confirmNewPassword?.message}
      >
        <TextInput
          id="confirmNewPassword"
          type="password"
          placeholder="Confirm your new password"
          isBlock
          {...register('confirmNewPassword', {
            required: 'Confirm new password is required',
            validate: (value) => {
              const password = watch('newPassword');
              return password === value || 'Confirm new password is not match';
            }
          })}
        />
      </FormControl>

      <Button
        type="submit"
        className="mt-10 w-full"
        isLoading={changePasswordMutation.isLoading}
        loadingText="Updating password..."
      >
        UPDATE PASSWORD
      </Button>
    </form>
  );
};

export default ForgotChangePasswordForm;

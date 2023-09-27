'use client';

import { useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import Text from '@/components/elements/Text';
import TextInput from '@/components/elements/TextInput';
import { forgotChangePassword } from '@/repositories/auth';

const ForgotChangePassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

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

  const newPassword = watch('newPassword');

  const changePasswordMutation = useMutation({
    mutationFn: forgotChangePassword,
    onSuccess: () => {
      toast.success('Update password success!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        pauseOnHover: false,
        theme: 'colored'
      });
    },
    onError: (error) => {
      toast.error(error.data.message, {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        pauseOnHover: false,
        theme: 'colored'
      });
    }
  });

  const onSubmit = useCallback(
    (data) => {
      changePasswordMutation.mutate(data);
    },
    [changePasswordMutation]
  );

  return (
    <div className="rounded-md border border-gray-300 p-8">
      <div className="mx-8 text-center">
        <Text as="h1" typography="h1">
          Reset Password
        </Text>
        <Text typography="xs" className="mt-1">
          Set a new password for your account, <br /> make sure to remember it this time &#58;&#41;
        </Text>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            htmlFor="newPassword"
            label="New Password"
            isBlock
            error={errors.newPassword?.message}
          >
            <TextInput
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              isBlock
              {...register('newPassword', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password needs to be at least 8 character'
                }
              })}
            />
          </FormControl>

          <FormControl
            htmlFor="confirmNewPassword"
            label="Confirm New Password"
            isBlock
            error={errors.confirmNewPassword?.message}
          >
            <TextInput
              id="confirmNewPassword"
              type="password"
              placeholder="Confirm your new password"
              isBlock
              {...register('confirmNewPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === newPassword || `Password doesn't match`
              })}
            />
          </FormControl>

          <Button
            type="submit"
            isLoading={changePasswordMutation.isLoading}
            className="mt-6 h-[2.5rem] min-h-[2.5rem] w-full"
          >
            UPDATE PASSWORD
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotChangePassword;

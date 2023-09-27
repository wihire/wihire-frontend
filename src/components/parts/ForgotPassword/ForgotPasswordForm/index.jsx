import Button from '@/components/elements/Button';
import { EMAIL_REGEX } from '@/lib/constants/regex';
import FormControl from '@/components/elements/FormControl';
import TextInput from '@/components/elements/TextInput';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '@/repositories/auth';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

const forgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: ({ data }) => {
      console.log(data, '<<<<<<<<<<<,');
      // terusin di sini
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
      <FormControl htmlFor="email" label="Email" error={errors.email?.message}>
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
      <Button type="submit" className="mt-10 w-full">
        SEND
      </Button>
    </form>
  );
};

export default forgotPasswordForm;

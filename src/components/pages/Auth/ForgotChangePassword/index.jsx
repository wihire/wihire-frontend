'use client';

import { useState } from 'react';

import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import FormControl from '@/components/elements/FormControl';
import Text from '@/components/elements/Text';
import TextInput from '@/components/elements/TextInput';

const ForgotChangePassword = () => {
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPasswordValue(confirmPassword);

    if (confirmPassword !== passwordValue) {
      setError('Password doesn&#39;t match');
    } else {
      setError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (passwordValue !== confirmPasswordValue) {
      setError('Password doesn&#39;t match');
      toast.error('Password doesn&#39;t match', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        pauseOnHover: false,
        theme: 'colored'
      });

      setIsLoading(false);
      return;
    }

    toast.success('Update password success!', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      pauseOnHover: false,
      theme: 'colored'
    });
    setError(false);
    setIsLoading(false);
  };

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
        <form onSubmit={handleSubmit}>
          <FormControl htmlFor="password" label="New Password" isBlock>
            <TextInput
              id="password"
              type="password"
              name="password"
              placeholder="Enter your new password"
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
              isBlock
              required
            />
          </FormControl>

          <FormControl htmlFor="confirmPassword" label="Confirm New Password" error={error} isBlock>
            <TextInput
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPasswordValue}
              onChange={(e) => {
                validatePassword(e);
              }}
              isBlock
              required
            />
          </FormControl>

          <Button
            type="submit"
            isLoading={isLoading}
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

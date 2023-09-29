'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import { formatTime } from '@/lib/common';
import useInterval from '@/lib/hooks/useInterval';
import { sendVerificationEmail } from '@/repositories/auth';

const MAX_SECONDS = 60 * 3; // 3 minutes

const SendVerification = ({ email }) => {
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  const { clear, reset } = useInterval(() => setSeconds((prev) => prev - 1), 1000);

  useEffect(() => {
    if (seconds === 0) clear();
  }, [seconds, clear]);

  const sendVerificationEmailMutation = useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      toast.success('Email has been sent');
      setSeconds(MAX_SECONDS);
      reset();
    }
  });

  const handleClick = useCallback(() => {
    sendVerificationEmailMutation.mutate({
      email
    });
  }, [email, sendVerificationEmailMutation]);

  return seconds ? (
    <Text className="text-center">{formatTime(seconds)}</Text>
  ) : (
    <Button
      onClick={handleClick}
      className="btn-outline mt-3 w-full"
      isLoading={sendVerificationEmailMutation.isLoading}
      loadingText="Sending..."
    >
      Resend
    </Button>
  );
};

export default SendVerification;

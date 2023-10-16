'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Button from '@/components/elements/Button';
import { formatTime } from '@/lib/common';
import useInterval from '@/lib/hooks/useInterval';
import { sendVerificationEmail } from '@/repositories/auth';

const MAX_SECONDS = 60 * 2; // 2 minutes

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
    if (seconds > 0) return;

    sendVerificationEmailMutation.mutate({
      email
    });
  }, [email, seconds, sendVerificationEmailMutation]);

  return (
    <Button
      onClick={handleClick}
      className="btn-outline btn-wide mt-3"
      isLoading={sendVerificationEmailMutation.isLoading}
      loadingText="Sending..."
    >
      {seconds ? formatTime(seconds) : 'Resend'}
    </Button>
  );
};

export default SendVerification;

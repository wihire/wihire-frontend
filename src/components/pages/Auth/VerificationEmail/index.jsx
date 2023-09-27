'use client';

import { useState, useEffect, useCallback } from 'react';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { toast } from 'react-toastify';

import verifyEmailArt from '@/assets/images/ilustrations/Verified-email.png';
import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import { getCookie } from '@/lib/cookies';
import { verifyEmail } from '@/repositories/verifyEmail';

const VerificationEmail = () => {
  const [seconds, setSeconds] = useState(30);

  const userEmail = getCookie('email');

  const verifyMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success('Email has been sent', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }
  });

  const handleverify = useCallback(() => {
    verifyMutation.mutate({ email: userEmail });
  }, [verifyMutation, userEmail]);
  // function countdown() {
  //   setSeconds(() => seconds - 1);
  // }

  useEffect(() => {
    handleverify();
  }, [handleverify]);

  useEffect(() => {
    if (seconds !== 0) {
      setTimeout(() => setSeconds(() => seconds - 1), 1000);
    }
  }, [seconds]);
  return (
    <Container className="grid justify-items-center gap-5">
      <Image src={verifyEmailArt} width={300} height={300} alt="verify-email" />

      <Text as="h1" typography="h1" className="text-center">
        Verify Your Email Address
      </Text>

      <div>
        <Text className="text-center">We have sent an email to example@mail.com,</Text>
        <Text className="text-center">
          Please follow the link provided there to verify your email
        </Text>
      </div>

      <Text>Resend email?</Text>
      {seconds ? (
        <Text>{seconds < 10 ? `00:0${seconds}` : `00:${seconds}`}</Text>
      ) : (
        <Button
          onClick={() => {
            setSeconds(30);
            handleverify();
          }}
        >
          Resend
        </Button>
      )}
    </Container>
  );
};

export default VerificationEmail;

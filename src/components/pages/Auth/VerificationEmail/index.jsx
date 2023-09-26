'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';

import verifyEmailArt from '@/assets/images/ilustrations/Verified-email.png';
import Button from '@/components/elements/Button';
import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';

const VerificationEmail = () => {
  const [seconds, setSeconds] = useState(30);
  function countdown() {
    setSeconds(() => seconds - 1);
  }

  useEffect(() => {
    if (seconds !== 0) {
      setTimeout(countdown, 1000);
    }
  }, [seconds, countdown]);
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
        <Button onClick={() => setSeconds(30)}>Resend</Button>
      )}
    </Container>
  );
};

export default VerificationEmail;

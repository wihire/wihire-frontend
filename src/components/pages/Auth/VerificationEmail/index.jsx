import { redirect } from 'next/navigation';

import verifyEmailArt from '@/assets/images/illustrations/verified-email.png';
import Container from '@/components/elements/Container';
import Image from '@/components/elements/Image';
import Text from '@/components/elements/Text';
import SendVerification from '@/components/parts/VerificationEmail/SendVerification';
import { EMAIL_KEY } from '@/lib/constants/storageKey';
import { getCookie } from '@/lib/cookies';

const VerificationEmail = () => {
  const userEmail = getCookie(EMAIL_KEY);

  if (!userEmail) {
    return redirect('/login');
  }

  return (
    <Container
      className="grid justify-items-center gap-5
        rounded-md border-gray-100 bg-white p-4 md:border md:p-14"
    >
      <Image src={verifyEmailArt} width={300} height={300} alt="verify-email" />

      <Text as="h1" typography="h1" className="text-center">
        Verify your email address
      </Text>

      <Text className="text-center">
        We have sent an email to <strong>{userEmail}</strong>, <br />
        please follow the link provided there to verify your email
      </Text>

      <div>
        <Text className="text-center">Resend email?</Text>

        <SendVerification email={userEmail} />
      </div>
    </Container>
  );
};

export default VerificationEmail;

import Image from 'next/image';

import forgotPasswordIllustration from '@/assets/images/illustrations/forgot-password.png';
import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import ForgotPasswordForm from '@/components/parts/ForgotPassword/ForgotPasswordForm';

const ForgotPassword = () => (
  <Container className="rounded-md border border-gray-100 p-14 text-center">
    <Image
      src={forgotPasswordIllustration}
      alt="Authentication illustration"
      width={300}
      height={300}
      className="mx-auto"
    />

    <Text typography="h1">Forgot your password?</Text>

    <Text typography="sm" className="mb-10 mt-3 text-gray-400">
      Tell us your email and well send a link to reset your password
    </Text>

    <ForgotPasswordForm />
  </Container>
);

export default ForgotPassword;

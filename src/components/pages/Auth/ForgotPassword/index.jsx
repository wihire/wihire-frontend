import Image from 'next/image';

import forgotPasswordIlustration from '@/assets/images/ilustrations/forgot-password.png';
import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import ForgotPasswordForm from '@/components/parts/ForgotPassword/ForgotPasswordForm';

const ForgotPassword = () => (
  // eslint-disable-next-line max-len
  <Container className="w-full justify-center items-center border-solid border-2 border-black-700 rounded-lg p-16">
    <div className="text-center">
      <Image
        src={forgotPasswordIlustration}
        alt="Authentication ilustration"
        width={300}
        height={300}
      />
      <Text typography="h1">Forgot Password?</Text>

      <Text typography="sm" className="text-gray-400 mt-5 mb-10">
        Tell us your email and well send a link <br />
        to reset your password
      </Text>
    </div>

    <ForgotPasswordForm />
  </Container>
);

export default ForgotPassword;

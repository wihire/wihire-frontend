import Image from 'next/image';

import forgotPasswordIlustration from '@/assets/images/ilustrations/forgot-password.png';
import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import ForgotPasswordForm from '@/components/parts/ForgotPassword/ForgotPasswordForm';
import '@/components/pages/Auth/ForgotPassword/styles.css';

const ForgotPassword = () => (
  // eslint-disable-next-line max-len
  <Container className="w-full items-center justify-center rounded-xl border-2 border-solid border-gray-100 p-16">
    <div className="text-center">
      <div className='flex items-center justify-center'>
        <Image
          src={forgotPasswordIlustration}
          alt="Authentication ilustration"
          width={300}
          height={300}
        />
      </div>

      <Text typography="h1">Forgot your password?</Text>

      <Text typography="sm" className="mb-10 mt-5 text-gray-400">
        Tell us your email and well send a link <br />
        to reset your password
      </Text>
    </div>

    <ForgotPasswordForm />
  </Container>
);

export default ForgotPassword;

import Image from 'next/image';

import loginIlustration from '@/assets/images/illustrations/authentication.png';
import Container from '@/components/elements/Container';
import LoginForm from '@/components/parts/Login/LoginForm';

const Login = () => (
  <div className="min-h-d-screen bg-white md:bg-primary-content">
    <Container className="min-h-d-screen flex w-full items-center justify-center py-8">
      <div className="hidden lg:flex lg:w-4/6 lg:items-center lg:justify-center">
        <Image src={loginIlustration} alt="Authentication ilustration" width={500} height={500} />
      </div>

      <LoginForm className="w-full md:w-5/6 lg:w-2/6" />
    </Container>
  </div>
);

export default Login;

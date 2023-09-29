import Image from 'next/image';

import loginIlustration from '@/assets/images/illustrations/authentication.png';
import Container from '@/components/elements/Container';
import LoginForm from '@/components/parts/Login/LoginForm';

const Login = () => (
  <div className="min-h-d-screen bg-primary-content">
    <Container className="grid min-h-d-screen grid-cols-12 items-center gap-7 py-6">
      <div className="col-span-8 mx-auto">
        <Image src={loginIlustration} alt="Authentication ilustration" width={500} height={500} />
      </div>

      <LoginForm className="col-span-4" />
    </Container>
  </div>
);

export default Login;

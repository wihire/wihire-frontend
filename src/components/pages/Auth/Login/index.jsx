import Image from 'next/image';

import loginIlustration from '@/assets/images/ilustrations/authentication.png';
import Container from '@/components/elements/Container';
import LoginForm from '@/components/parts/Login/LoginForm';

import './styles.scss';

const Login = () => (
  <Container className="grid h-screen grid-cols-12 items-center gap-7 py-6">
    <div className="col-span-8 mx-auto">
      <Image src={loginIlustration} alt="Authentication ilustration" width={500} height={500} />
    </div>

    <LoginForm className="col-span-4" />
  </Container>
);

export default Login;

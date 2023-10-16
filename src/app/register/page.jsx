import Register from '@/components/pages/Auth/Register';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  {
    title: 'Register'
  },
  {
    withSuffix: true
  }
);

const RegisterPage = async () => <Register />;

export default RegisterPage;

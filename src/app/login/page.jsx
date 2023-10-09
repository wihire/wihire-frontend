import Login from '@/components/pages/Auth/Login';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  {
    title: 'Login'
  },
  {
    withSuffix: true
  }
);

const LoginPage = () => <Login />;

export default LoginPage;

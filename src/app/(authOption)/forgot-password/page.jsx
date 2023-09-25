import ForgotPassword from '@/components/pages/Auth/ForgotPassword';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  {
    title: 'Forgot Password'
  },
  {
    withSuffix: true
  }
);

const ForgotPasswordPage = () => <ForgotPassword />;

export default ForgotPasswordPage;

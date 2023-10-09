import ForgotChangePassword from '@/components/pages/Auth/ForgotChangePassword';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  {
    title: 'Forgot Change Password'
  },
  {
    withSuffix: true
  }
);

const ForgotChangePasswordPage = ({ searchParams }) => (
  <ForgotChangePassword searchParams={searchParams} />
);

export default ForgotChangePasswordPage;

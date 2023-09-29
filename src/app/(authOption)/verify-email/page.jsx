import VerifyEmail from '@/components/pages/Auth/VerifyEmail';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  {
    title: 'Verify Email'
  },
  {
    withSuffix: true
  }
);

const VerifyEmailPage = () => <VerifyEmail />;

export default VerifyEmailPage;

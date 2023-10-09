import VerificationEmail from '@/components/pages/Auth/VerificationEmail';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  {
    title: 'Verification Email'
  },
  {
    withSuffix: true
  }
);

const VerificationEmailPage = () => <VerificationEmail />;

export default VerificationEmailPage;

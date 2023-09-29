import { redirect } from 'next/navigation';

import Text from '@/components/elements/Text';
import ForgotChangePasswordForm from '@/components/parts/ForgotPassword/ForgotChangePasswordForm';

const ForgotChangePassword = ({ searchParams }) => {
  const token = searchParams?.token;

  if (!token) {
    return redirect('/login');
  }

  return (
    <div className="w-[500px] rounded-md border border-gray-100 p-14 text-center">
      <Text as="h1" typography="h1">
        Reset Password
      </Text>

      <Text typography="xs" className="mb-10 mt-2 text-gray-400">
        Set a new password for your account, make sure to remember it this time &#58;&#41;
      </Text>

      <ForgotChangePasswordForm token={token} />
    </div>
  );
};

export default ForgotChangePassword;

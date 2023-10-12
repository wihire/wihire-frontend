import { redirect } from 'next/navigation';

import Text from '@/components/elements/Text';
import ForgotChangePasswordForm from '@/components/parts/ForgotPassword/ForgotChangePasswordForm';

const ForgotChangePassword = ({ searchParams }) => {
  const token = searchParams?.token;

  if (!token) {
    return redirect('/login');
  }

  return (
    <div
      className="w-full max-w-[500px] rounded-md border-gray-100
      bg-white p-4 text-center md:border md:p-14"
    >
      <Text as="h1" typography="h1">
        Reset password
      </Text>

      <Text typography="xs" className="mx-auto mb-10 mt-2 w-3/4 text-center text-gray-400">
        Set a new password for your account, make sure to remember it this time &#58;&#41;
      </Text>

      <ForgotChangePasswordForm token={token} />
    </div>
  );
};

export default ForgotChangePassword;

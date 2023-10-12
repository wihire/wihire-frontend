import Link from 'next/link';

import Text from '@/components/elements/Text';
import RegisterAsCompany from '@/components/parts/Register/RegisterAsCompany';
import RegisterAsUser from '@/components/parts/Register/RegisterAsUser';

const Register = () => (
  <div className="min-h-d-screen flex flex-col lg:flex-row">
    <RegisterAsCompany />

    <RegisterAsUser />

    <div
      className="bottom-6 left-1/2 mx-auto w-full
        border-t border-t-gray-200 bg-white p-5 shadow-md lg:fixed lg:w-fit
        lg:-translate-x-1/2 lg:rounded-md lg:border-none"
    >
      <Text typography="sm" className="text-center">
        You already have an account?{' '}
        <Link href="/login" className="font-bold text-primary underline">
          Login
        </Link>
      </Text>
    </div>
  </div>
);

export default Register;

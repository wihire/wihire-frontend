import Link from 'next/link';

import Text from '@/components/elements/Text';
import RegisterAsCompany from '@/components/parts/Register/RegisterAsCompany';
import RegisterAsUser from '@/components/parts/Register/RegisterAsUser';

const Register = () => (
  <div className="min-h-d-screen flex flex-col lg:flex-row">
    <RegisterAsCompany />

    <RegisterAsUser />

    <div
      className="bottom-6 mx-auto my-10 rounded-md bg-white p-5 shadow-md
      lg:fixed lg:left-1/2 lg:my-5 lg:-translate-x-1/2"
    >
      <Text typography="sm">
        You already have an account?{' '}
        <Link href="/login" className="font-bold text-primary underline">
          Login
        </Link>
      </Text>
    </div>
  </div>
);

export default Register;

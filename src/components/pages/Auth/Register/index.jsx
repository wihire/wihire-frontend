import Link from 'next/link';

import Text from '@/components/elements/Text';
import RegisterAsCompany from '@/components/parts/Register/RegisterAsCompany';
import RegisterAsUser from '@/components/parts/Register/RegisterAsUser';

const Register = () => (
  <div className="min-h-d-screen flex">
    <RegisterAsCompany />

    <RegisterAsUser />

    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-md bg-white p-5 shadow-md">
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

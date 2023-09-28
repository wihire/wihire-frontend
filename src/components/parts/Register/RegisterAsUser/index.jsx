'use client';

import Image from 'next/image';

import registerJobSeekerImage from '@/assets/images/illustrations/hiring.png';
import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';

const RegisterAsUser = () => (
  <div className="flex w-1/2 flex-col items-center justify-center gap-10 bg-white text-center">
    <Image width={200} height={200} src={registerJobSeekerImage} alt="Register as user" />

    <div>
      <Text as="h2" typography="h1" className="mb-4">
        For Job Seeker
      </Text>
      <Text typography="md" className="mx-auto w-3/4">
        Create your company account and search for suitable candidates
      </Text>
    </div>

    <Button className="btn-outline">REGISTER AS JOB SEEKER</Button>
  </div>
);

export default RegisterAsUser;

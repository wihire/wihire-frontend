'use client';

import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

import About from '@/components/parts/ProfileCompany/About';
import BasicInformation from '@/components/parts/ProfileCompany/BasicInformation';

const Jobs = dynamic(() => import('@/components/parts/ProfileCompany/Jobs'));

const ProfileCompany = ({ profile }) => {
  const { data: loggedData, status } = useSession();

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <section className="flex flex-col rounded-md bg-white p-8">
        <BasicInformation />

        <About />
      </section>

      {status === 'authenticated' && loggedData?.profile?.id !== profile.id ? <Jobs /> : null}
    </div>
  );
};

export default ProfileCompany;

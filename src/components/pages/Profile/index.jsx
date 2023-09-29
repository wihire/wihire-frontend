'use client';

import { useParams } from 'next/navigation';

import About from '@/components/parts/ProfileCompany/About';
import BasicInformation from '@/components/parts/ProfileCompany/BasicInformation';
import { useProfile } from '@/query/profile';

const Profile = () => {
  const params = useParams();

  const { data } = useProfile(params.companySlug);

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-white px-10 py-7">
      <BasicInformation profile={data?.data?.data?.profile} />
      <div className="divider" />
      <About profile={data?.data?.data?.profile} />
    </div>
  );
};

export default Profile;

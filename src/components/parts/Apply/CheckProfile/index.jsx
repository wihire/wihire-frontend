import { useSession } from 'next-auth/react';

import ProfileUser from '@/components/parts/Profile';
import { useProfile } from '@/query/profile';

const CheckProfile = () => {
  const { data } = useSession();
  const { data: profileData } = useProfile(data?.profile?.slug);

  return <ProfileUser withoutResume hideBirthDate {...profileData?.data?.data?.profile} />;
};

export default CheckProfile;

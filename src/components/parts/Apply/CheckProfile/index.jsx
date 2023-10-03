import { useSession } from 'next-auth/react';

import ProfileUser from '@/components/parts/Profile';

const CheckProfile = () => {
  const { data } = useSession();

  return <ProfileUser profileSlug={data?.profile.slug} withoutResume />;
};

export default CheckProfile;

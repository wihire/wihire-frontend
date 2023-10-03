'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import ProfileUser from '@/components/parts/Profile';
import ProfileCompany from '@/components/parts/ProfileCompany';
import { ROLE } from '@/lib/constants/common';
import { useProfile } from '@/query/profile';

const Profile = () => {
  const params = useParams();

  const { data } = useProfile(params.profileSlug);
  const profile = useMemo(() => data?.data?.data?.profile, [data]);

  if (profile?.role === ROLE.COMPANY) {
    return <ProfileCompany />;
  }

  return <ProfileUser profileSlug={params.profileSlug} />;
};

export default Profile;

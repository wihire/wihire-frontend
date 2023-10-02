import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import Profile from '@/components/pages/Profile';
import { authOptions } from '@/lib/auth';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getJobsKey } from '@/query/jobs';
import { getProfileKey } from '@/query/profile';
import { getJobs } from '@/repositories/jobs';
import { getProfile } from '@/repositories/profile';

export const metadata = generateMetadata(
  {
    title: 'Profile'
  },
  {
    withSuffix: true
  }
);

const ProfilePage = async ({ params, searchParams }) => {
  const session = await getServerSession(authOptions);
  const profile = session?.profile;

  const { profileSlug } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getProfileKey(profileSlug), () => getProfile(profileSlug));

  if (profile?.role === ROLE.COMPANY) {
    const filter = {
      page: Number(searchParams?.page) || 1,
      slug: profileSlug,
      status: 'POSTED'
    };

    await queryClient.prefetchQuery(getJobsKey(filter), () => getJobs(filter));
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Profile />
    </Hydrate>
  );
};

export default ProfilePage;

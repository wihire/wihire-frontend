import { Hydrate, dehydrate } from '@tanstack/react-query';

import Profile from '@/components/pages/Profile';
import generateMetadata from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getProfileKey } from '@/query/profile';
import { getProfile } from '@/repositories/profile';

export const metadata = generateMetadata(
  {
    title: 'Profile'
  },
  {
    withSuffix: true
  }
);

const ProfilePage = async ({ params }) => {
  const { profileSlug } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getProfileKey(profileSlug), () => getProfile(profileSlug));

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Profile />
    </Hydrate>
  );
};

export default ProfilePage;

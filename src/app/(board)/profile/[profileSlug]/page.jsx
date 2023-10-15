import { Hydrate, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Profile from '@/components/pages/Profile';
import { default as generateOwnMetadata } from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getProfileKey } from '@/query/profile';
import { getProfile } from '@/repositories/profile';

export async function generateMetadata({ params }) {
  try {
    const { profileSlug } = params;

    const profileData = await getProfile(profileSlug);
    const { profile } = profileData.data.data;

    return generateOwnMetadata(
      {
        title: profile.name
      },
      {
        withSuffix: true
      }
    );
  } catch (error) {
    return generateOwnMetadata(
      {
        title: 'Profile Not Found'
      },
      {
        withSuffix: true
      }
    );
  }
}

const ProfilePage = async ({ params }) => {
  try {
    const { profileSlug } = params;

    const profile = await getProfile(profileSlug);

    const queryClient = getQueryClient();
    await queryClient.setQueryData(getProfileKey(profileSlug), profile);
    const dehydratedState = dehydrate(queryClient);

    return (
      <Hydrate state={dehydratedState}>
        <Profile />
      </Hydrate>
    );
  } catch (error) {
    if (error?.type === 'NOT_FOUND_ERR') {
      return notFound();
    }

    throw Error(error?.message);
  }
};

export default ProfilePage;

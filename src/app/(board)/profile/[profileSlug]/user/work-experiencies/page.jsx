import { Hydrate, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import UserWorkExperience from '@/components/pages/UserWorkExperience';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getProfileKey } from '@/query/profile';
import { getProfile } from '@/repositories/profile';

export const metadata = generateMetadata(
  {
    title: 'User Work Experiencies'
  },
  {
    withSuffix: true
  }
);

const UserWorkExperienciesPage = async ({ params }) => {
  try {
    await pageAuthorization([ROLE.USER]);

    const { profileSlug } = params;

    const profile = await getProfile(profileSlug);

    const queryClient = getQueryClient();
    await queryClient.setQueryData(getProfileKey(profileSlug), profile);
    const dehydratedState = dehydrate(queryClient);

    return (
      <Hydrate state={dehydratedState}>
        <UserWorkExperience />
      </Hydrate>
    );
  } catch (error) {
    if (error?.type === 'NOT_FOUND_ERR') {
      return notFound();
    }

    throw Error(error?.message);
  }
};

export default UserWorkExperienciesPage;

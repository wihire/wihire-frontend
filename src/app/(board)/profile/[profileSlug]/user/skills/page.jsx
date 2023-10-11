import { Hydrate, dehydrate } from '@tanstack/react-query';

import UserSkill from '@/components/pages/UserSkill';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getProfileKey } from '@/query/profile';
import { getProfile } from '@/repositories/profile';

export const metadata = generateMetadata(
  {
    title: 'User Skills'
  },
  {
    withSuffix: true
  }
);

const UserSkillsPage = async ({ params }) => {
  await pageAuthorization([ROLE.USER]);

  const { profileSlug } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getProfileKey(profileSlug), () => getProfile(profileSlug));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <UserSkill />
    </Hydrate>
  );
};

export default UserSkillsPage;

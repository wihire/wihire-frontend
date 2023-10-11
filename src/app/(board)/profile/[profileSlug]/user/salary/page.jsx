import { Hydrate, dehydrate } from '@tanstack/react-query';

import UserSalaryExpectation from '@/components/pages/UserSalaryExpectation';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getProfileKey } from '@/query/profile';
import { getProfile } from '@/repositories/profile';

export const metadata = generateMetadata(
  {
    title: 'User Salary Expectation'
  },
  {
    withSuffix: true
  }
);

const UserSalaryExpectationPage = async ({ params }) => {
  await pageAuthorization([ROLE.USER]);

  const { profileSlug } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getProfileKey(profileSlug), () => getProfile(profileSlug));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <UserSalaryExpectation />
    </Hydrate>
  );
};

export default UserSalaryExpectationPage;

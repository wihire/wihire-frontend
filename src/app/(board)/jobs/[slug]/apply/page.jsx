import { Hydrate, dehydrate } from '@tanstack/react-query';

import Apply from '@/components/pages/Jobs/Apply';
import { ROLE } from '@/lib/constants/common';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getProfileKey } from '@/query/profile';
import { getProfile } from '@/repositories/profile';

const ApplyPage = async () => {
  const profile = await pageAuthorization([ROLE.USER]);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getProfileKey(profile.profileSlug), () =>
    getProfile(profile.profileSlug)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Apply />
    </Hydrate>
  );
};

export default ApplyPage;

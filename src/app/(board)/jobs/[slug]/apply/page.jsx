import { Hydrate, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Apply from '@/components/pages/Jobs/Apply';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getProfileKey } from '@/query/profile';
import { getJob } from '@/repositories/jobs';
import { getProfile } from '@/repositories/profile';

export const metadata = generateMetadata(
  {
    title: 'Apply Job'
  },
  {
    withSuffix: true
  }
);

const ApplyPage = async ({ params }) => {
  try {
    const profileSession = await pageAuthorization([ROLE.USER]);

    const { slug } = params;
    await getJob(slug);

    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(getProfileKey(profileSession.slug), () =>
      getProfile(profileSession.slug)
    );
    const dehydratedState = dehydrate(queryClient);

    return (
      <Hydrate state={dehydratedState}>
        <Apply profileSlug={profileSession.slug} />
      </Hydrate>
    );
  } catch (error) {
    if (error?.type === 'NOT_FOUND_ERR') {
      return notFound();
    }

    throw Error(error?.message);
  }
};

export default ApplyPage;

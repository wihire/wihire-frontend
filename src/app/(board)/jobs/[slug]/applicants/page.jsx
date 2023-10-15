import { Hydrate, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Applicants from '@/components/pages/Applicants';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getApplicantsJobKey } from '@/query/jobs';
import { getApplicantsJob } from '@/repositories/jobs';

export const metadata = generateMetadata(
  {
    title: 'Applicants'
  },
  {
    withSuffix: true
  }
);

const ApplicantsPage = async ({ params, searchParams }) => {
  try {
    await pageAuthorization([ROLE.COMPANY]);

    const { slug } = params;

    const filter = {
      page: Number(searchParams?.page) || 1,
      status: searchParams?.status || undefined
    };

    const applicants = await getApplicantsJob(slug, filter);

    const queryClient = getQueryClient();

    await queryClient.setQueryData(getApplicantsJobKey(slug, filter), applicants);

    const dehydratedState = dehydrate(queryClient);

    return (
      <Hydrate state={dehydratedState}>
        <Applicants jobSlug={slug} />
      </Hydrate>
    );
  } catch (error) {
    if (error?.type === 'NOT_FOUND_ERR') {
      return notFound();
    }

    throw Error(error?.message);
  }
};

export default ApplicantsPage;

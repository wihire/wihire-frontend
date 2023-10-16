import { Hydrate, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import ApplicantDetail from '@/components/pages/ApplicantDetail';
import { ROLE } from '@/lib/constants/common';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getApplicantKey } from '@/query/applicant';
import { getApplicantDetail } from '@/repositories/applicantDetail';

const ApplicantDetailPage = async ({ params }) => {
  try {
    await pageAuthorization([ROLE.COMPANY]);

    const { slug, userSlug } = params;

    const applicant = await getApplicantDetail(slug, userSlug);

    const queryClient = getQueryClient();
    await queryClient.setQueryData(getApplicantKey(slug, userSlug), applicant);
    const dehydrateState = dehydrate(queryClient);

    return (
      <Hydrate state={dehydrateState}>
        <ApplicantDetail />
      </Hydrate>
    );
  } catch (error) {
    if (error?.type === 'NOT_FOUND_ERR') {
      return notFound();
    }

    throw Error(error?.message);
  }
};

export default ApplicantDetailPage;

import { Hydrate, dehydrate } from '@tanstack/react-query';

import ApplicantDetail from '@/components/pages/ApplicantDetail';
import { getQueryClient } from '@/lib/queryClient';
import { getApplicantKey } from '@/query/applicantDetail';
import { getApplicantDetail } from '@/repositories/applicantDetail';

const ApplicantDetailPage = async ({ params }) => {
  const { slug, userSlug } = params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getApplicantKey(slug, userSlug), () =>
    getApplicantDetail(slug, userSlug)
  );
  const dehydrateState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydrateState}>
      <ApplicantDetail />
    </Hydrate>
  );
};

export default ApplicantDetailPage;

import { useQuery } from '@tanstack/react-query';

import { getApplicantDetail } from '@/repositories/applicantDetail';

export const getApplicantKey = (jobSlug, userSlug) => ['applicant', jobSlug, userSlug];

export const useApplicantDetail = (jobSlug, userSlug) => {
  const result = useQuery({
    queryKey: getApplicantKey(jobSlug, userSlug),
    queryFn: () => getApplicantDetail(jobSlug, userSlug)
  });

  return result;
};

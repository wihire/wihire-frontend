import { useQuery } from '@tanstack/react-query';

import { getApplications, applyJobCheck } from '@/repositories/applications';

export const getApplicationsKeys = (filter) => ['applications', filter];

export const useApplications = (filter) => {
  const result = useQuery({
    queryKey: getApplicationsKeys(filter),
    queryFn: () => getApplications(filter),
    keepPreviousData: true
  });

  return result;
};

export const getApplicantCheckKey = (slug) => ['application-check', slug];

export const useApplyJobCheck = (slug) => {
  const result = useQuery({
    queryKey: getApplicantCheckKey(slug),
    queryFn: () => applyJobCheck(slug)
  });

  return result;
};

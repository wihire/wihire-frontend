import { useQuery } from '@tanstack/react-query';

import { getJobs, getJob, getApplicantsJob } from '@/repositories/jobs';

export const getJobsKey = (filters) => ['jobs', filters];

export const useJobs = (filters) => {
  const result = useQuery({
    queryKey: getJobsKey(filters),
    queryFn: () => getJobs(filters),
    keepPreviousData: true
  });

  return result;
};

export const getJobKey = (slug) => ['job', slug];

export const useJob = (slug) => {
  const result = useQuery({
    queryKey: getJobKey(slug),
    queryFn: () => getJob(slug)
  });

  return result;
};

export const getApplicantsJobKey = (slug, userSlug, filters) => [
  'applicants-job',
  slug,
  userSlug,
  filters
];

export const useApplicantsJob = (slug, userSlug, filters) => {
  const result = useQuery({
    queryKey: getApplicantsJobKey(slug, userSlug, filters),
    queryFn: () => getApplicantsJob(slug, userSlug, filters)
  });

  return result;
};

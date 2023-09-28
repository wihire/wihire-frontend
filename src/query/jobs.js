import { useQuery } from '@tanstack/react-query';

import { getJobs, getJob } from '@/repositories/jobs';

export const getJobsKey = (filters) => ['jobs', filters];

export const getJobKey = (slug) => ['job', slug];

export const useJobs = (filters) => {
  const result = useQuery({
    queryKey: getJobsKey(filters),
    queryFn: () => getJobs(filters),
    keepPreviousData: true
  });

  return result;
};

export const useJob = (slug) => {
  const result = useQuery({
    queryKey: getJobKey(slug),
    queryFn: () => getJob(slug)
  });

  return result;
};

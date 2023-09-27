import { useQuery } from '@tanstack/react-query';

import { getJobs } from '@/repositories/jobs';

export const getJobsKey = (filters) => ['jobs', filters];

export const useJobs = (filters) => {
  const result = useQuery({
    queryKey: getJobsKey(filters),
    queryFn: () => getJobs(filters),
    keepPreviousData: true
  });

  return result;
};

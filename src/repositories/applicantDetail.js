import fetcher from '@/lib/fetcher';

export const getApplicantDetail = async (jobSlug, userSlug) => {
  const response = await fetcher({
    url: `/jobs/${jobSlug}/applicants/${userSlug}`
  });

  return response;
};

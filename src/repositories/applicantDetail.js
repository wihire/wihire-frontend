import fetcher from '@/lib/fetcher';

export const getApplicantDetail = async (jobSlug, userSlug) => {
  const response = await fetcher({
    url: `/jobs/${jobSlug}/applicants/${userSlug}`
  });

  return response;
};

export const updateApplicantStatus = async ({ jobSlug, userSlug, status }) => {
  const response = await fetcher({
    url: `/jobs/${jobSlug}/applicants/${userSlug}`,
    method: 'PUT',
    body: JSON.stringify({ status })
  });

  return response;
};

import fetcher from '@/lib/fetcher';

export const getJob = async (slug) => {
  const response = await fetcher({
    url: `/jobs/${slug}`
  });

  return response;
};

export const getJobs = async (filters) => {
  const response = await fetcher({
    url: '/jobs',
    query: filters
  });

  return response;
};

export const saveJob = async (slug) => {
  const response = await fetcher({
    url: `/jobs/${slug}/save`,
    method: 'POST'
  });

  return response;
};

export const unsaveJob = async (slug) => {
  const response = await fetcher({
    url: `/jobs/${slug}/unsave`,
    method: 'DELETE'
  });

  return response;
};

export const getApplicantsJob = async (slug, filters) => {
  const response = await fetcher({
    url: `/jobs/${slug}/applicants`,
    query: filters
  });

  return response;
};

export const updateApplicantStatus = async ({ slug, userSlug, status }) => {
  const response = await fetcher({
    url: `/jobs/${slug}/applicants/${userSlug}`,
    method: 'PUT',
    body: JSON.stringify({ status })
  });

  return response;
};

export const rejectAll = async (slug) => {
  const response = await fetcher({
    url: `/jobs/${slug}/applicants/reject-all`,
    method: 'PUT'
  });

  return response;
};

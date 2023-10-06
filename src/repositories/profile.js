import fetcher from '@/lib/fetcher';

export const getProfile = async (profileSlug) => {
  const response = await fetcher({
    url: `/profile/${profileSlug}`
  });

  return response;
};

export const updateBasicProfileCompany = async ({ payload }) => {
  const response = await fetcher({
    url: `/profile/company/basic`,
    method: 'PUT',
    body: payload,
    options: {
      isFormData: true
    }
  });

  return response;
};

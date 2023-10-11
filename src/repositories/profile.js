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

export const updateBasicProfileUser = async ({ payload }) => {
  const response = await fetcher({
    url: `/profile/user/basic`,
    method: 'PUT',
    body: payload,
    options: {
      isFormData: true
    }
  });

  return response;
};

export const updateResume = async ({ payload }) => {
  const response = await fetcher({
    url: `/profile/user/resume`,
    method: 'PUT',
    body: payload,
    options: {
      isFormData: true
    }
  });

  return response;
};

export const updateUserSalaryExpectation = async ({ payload }) => {
  const response = await fetcher({
    url: `/profile/user/salary-expectation`,
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  return response;
};

export const addUserEducation = async ({ payload }) => {
  const response = await fetcher({
    url: `/profile/user/educations`,
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response;
};

export const updateUserEducation = async (id, { payload }) => {
  const response = await fetcher({
    url: `/profile/user/educations/${id}`,
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  return response;
};

export const deleteUserEducation = async (id) => {
  const response = await fetcher({
    url: `/profile/user/educations/${id}`,
    method: 'DELETE'
  });

  return response;
};

export const addUserWorkExperience = async ({ payload }) => {
  const response = await fetcher({
    url: `/profile/user/work-experiences`,
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response;
};

export const updateUserWorkExperience = async (id, { payload }) => {
  const response = await fetcher({
    url: `/profile/user/work-experiences/${id}`,
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  return response;
};

export const deleteUserWorkExperience = async (id) => {
  const response = await fetcher({
    url: `/profile/user/work-experiences/${id}`,
    method: 'DELETE'
  });

  return response;
};

export const addUserProject = async ({ payload }) => {
  const response = await fetcher({
    url: `/profile/user/projects`,
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response;
};

export const updateUserProject = async (id, { payload }) => {
  const response = await fetcher({
    url: `/profile/user/projects/${id}`,
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  return response;
};

export const deleteUserProject = async (id) => {
  const response = await fetcher({
    url: `/profile/user/projects/${id}`,
    method: 'DELETE'
  });

  return response;
};

export const addUserSkill = async ({ payload }) => {
  const response = await fetcher({
    url: `/profile/user/skills`,
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response;
};

export const updateUserSkill = async (id, { payload }) => {
  const response = await fetcher({
    url: `/profile/user/skills/${id}`,
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  return response;
};

export const deleteUserSkill = async (id) => {
  const response = await fetcher({
    url: `/profile/user/skills/${id}`,
    method: 'DELETE'
  });

  return response;
};

export const addUserCertificate = async ({ payload }) => {
  const response = await fetcher({
    url: `/profile/user/certificates`,
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response;
};

export const updateUserCertificate = async (id, { payload }) => {
  const response = await fetcher({
    url: `/profile/user/certificates/${id}`,
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  return response;
};

export const deleteUserCertificate = async (id) => {
  const response = await fetcher({
    url: `/profile/user/certificates/${id}`,
    method: 'DELETE'
  });

  return response;
};

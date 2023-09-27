export const combineSearchParams = (searchParams, newParams) => {
  const params = new URLSearchParams(searchParams);
  Object.keys(newParams).forEach((key) => {
    params.append(key, newParams[key]);
  });
  return params;
};

export const removeSearchParams = (searchParams, paramsToRemove) => {
  const params = new URLSearchParams(searchParams);
  paramsToRemove.forEach((key) => {
    params.delete(key);
  });
  return params;
};

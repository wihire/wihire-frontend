import { useQuery } from '@tanstack/react-query';

import { getProvinces, getRegencies } from '@/repositories/location';

export const getProvincesKey = () => ['province'];

export const useProvinces = () => {
  const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

  const result = useQuery({
    queryKey: getProvincesKey(),
    queryFn: () => getProvinces(),
    cacheTime: MAX_AGE,
    staleTime: MAX_AGE
  });

  return result;
};

export const getRegenciesKey = (provinceId) => ['regency', provinceId];

export const useRegencies = (provinceId, queryOptions) => {
  const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

  const result = useQuery({
    queryKey: getRegenciesKey(provinceId),
    queryFn: () => getRegencies(provinceId),
    cacheTime: MAX_AGE,
    staleTime: MAX_AGE,
    ...queryOptions
  });

  return result;
};

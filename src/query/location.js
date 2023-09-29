import { useQuery } from '@tanstack/react-query';

import { getProvinces, getRegencies } from '@/repositories/location';

export const getProvincesKey = () => ['province'];

export const useProvinces = () => {
  const result = useQuery({
    queryKey: getProvincesKey(),
    queryFn: () => getProvinces(),
    cacheTime: 60 * 60 * 24 * 365 // 1 year
  });

  return result;
};

export const getRegenciesKey = (provinceId) => ['regency', provinceId];

export const useRegencies = (provinceId, queryOptions) => {
  const result = useQuery({
    queryKey: getRegenciesKey(provinceId),
    queryFn: () => getRegencies(provinceId),
    cacheTime: 60 * 60 * 24 * 365, // 1 year
    ...queryOptions
  });

  return result;
};

import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/repositories/category';

export const getCategoriesKey = (filters) => ['categories', filters];

export const useCategories = (filters) => {
  const result = useQuery({
    queryKey: getCategoriesKey(filters),
    queryFn: () => getCategories(filters)
  });

  return result;
};

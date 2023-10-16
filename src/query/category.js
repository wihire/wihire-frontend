import { useQuery } from '@tanstack/react-query';

import { getCategories, getMostPopularCategory } from '@/repositories/category';

export const getCategoriesKey = (filters) => ['categories', filters];
export const getMostCategoriesKey = () => ['popular-categories'];

export const useCategories = (filters) => {
  const result = useQuery({
    queryKey: getCategoriesKey(filters),
    queryFn: () => getCategories(filters)
  });

  return result;
};

export const useMostCategories = () => {
  const result = useQuery({
    queryKey: getMostCategoriesKey(),
    queryFn: () => getMostPopularCategory()
  });

  return result;
};

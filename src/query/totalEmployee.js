import { useQuery } from '@tanstack/react-query';

import { getTotalEmployees } from '@/repositories/totalEmployee';

export const getTotalEmployeesKey = () => ['totalEmployees'];

export const useTotalEmployees = () => {
  const result = useQuery({
    queryKey: getTotalEmployeesKey(),
    queryFn: () => getTotalEmployees()
  });

  return result;
};

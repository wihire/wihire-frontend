import { useQuery } from '@tanstack/react-query';

import { getSkills } from '@/repositories/skill';

export const getSkillsKey = (filters) => ['skills', filters];

export const useSkills = (filters) => {
  const result = useQuery({
    queryKey: getSkillsKey(filters),
    queryFn: () => getSkills(filters)
  });

  return result;
};

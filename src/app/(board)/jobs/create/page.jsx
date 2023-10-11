import { Hydrate, dehydrate } from '@tanstack/react-query';

import FormJob from '@/components/pages/Jobs/Create';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getCategoriesKey } from '@/query/category';
import { getProvincesKey } from '@/query/location';
import { getSkillsKey } from '@/query/skill';
import { getCategories } from '@/repositories/category';
import { getProvinces } from '@/repositories/location';
import { getSkills } from '@/repositories/skill';

export const metadata = generateMetadata(
  {
    title: 'Create Job'
  },
  {
    withSuffix: true
  }
);

const CreateJobPage = async () => {
  await pageAuthorization([ROLE.COMPANY]);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getCategoriesKey(), getCategories);
  await queryClient.prefetchQuery(getSkillsKey(), getSkills);
  await queryClient.prefetchQuery(getProvincesKey(), getProvinces);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <FormJob />
    </Hydrate>
  );
};

export default CreateJobPage;

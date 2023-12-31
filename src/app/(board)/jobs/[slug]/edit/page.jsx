import { Hydrate, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import EditJob from '@/components/pages/Jobs/Edit';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getCategoriesKey } from '@/query/category';
import { getJobKey } from '@/query/jobs';
import { getProvincesKey } from '@/query/location';
import { getSkillsKey } from '@/query/skill';
import { getCategories } from '@/repositories/category';
import { getJob } from '@/repositories/jobs';
import { getProvinces } from '@/repositories/location';
import { getSkills } from '@/repositories/skill';

export const metadata = generateMetadata(
  {
    title: 'Edit Job'
  },
  {
    withSuffix: true
  }
);

const EditJobPage = async ({ params }) => {
  try {
    await pageAuthorization([ROLE.COMPANY]);

    const { slug } = params;

    const jobData = await getJob(slug);

    const queryClient = getQueryClient();
    await queryClient.setQueryData(getJobKey(slug), jobData);
    await queryClient.prefetchQuery(getCategoriesKey(), getCategories);
    await queryClient.prefetchQuery(getSkillsKey(), getSkills);
    await queryClient.prefetchQuery(getProvincesKey(), getProvinces);
    const dehydratedState = dehydrate(queryClient);

    return (
      <Hydrate state={dehydratedState}>
        <EditJob jobSlug={slug} />
      </Hydrate>
    );
  } catch (error) {
    if (error?.type === 'NOT_FOUND_ERR') {
      return notFound();
    }

    throw Error(error?.message);
  }
};

export default EditJobPage;

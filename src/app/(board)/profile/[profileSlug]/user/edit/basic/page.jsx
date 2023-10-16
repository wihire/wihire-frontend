import { Hydrate, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import EditBasicForm from '@/components/parts/Profile/EditBasicForm';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';
import { getProvincesKey } from '@/query/location';
import { getProfileKey } from '@/query/profile';
import { getProvinces } from '@/repositories/location';
import { getProfile } from '@/repositories/profile';

export const metadata = generateMetadata(
  {
    title: 'User Edit Basic'
  },
  {
    withSuffix: true
  }
);

const UserEditBasicPage = async ({ params }) => {
  try {
    await pageAuthorization([ROLE.USER]);

    const { profileSlug } = params;

    const profile = await getProfile(profileSlug);

    const queryClient = getQueryClient();
    await queryClient.setQueryData(getProfileKey(profileSlug), profile);
    await queryClient.prefetchQuery(getProvincesKey(), getProvinces);
    const dehydratedState = dehydrate(queryClient);

    return (
      <Hydrate state={dehydratedState}>
        <EditBasicForm />
      </Hydrate>
    );
  } catch (error) {
    if (error?.type === 'NOT_FOUND_ERR') {
      return notFound();
    }

    throw Error(error?.message);
  }
};

export default UserEditBasicPage;

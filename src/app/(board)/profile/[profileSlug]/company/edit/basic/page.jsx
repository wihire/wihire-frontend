import { Hydrate, dehydrate } from '@tanstack/react-query';

import EditBasicForm from '@/components/parts/ProfileCompany/EditBasicForm';
import generateMetadata from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getCompanyScopesKey } from '@/query/companyScope';
import { getProvincesKey } from '@/query/location';
import { getProfileKey } from '@/query/profile';
import { getTotalEmployeesKey } from '@/query/totalEmployee';
import { getCompanyScopes } from '@/repositories/companyScope';
import { getProvinces } from '@/repositories/location';
import { getProfile } from '@/repositories/profile';
import { getTotalEmployees } from '@/repositories/totalEmployee';

export const metadata = generateMetadata(
  {
    title: 'Company Edit Basic'
  },
  {
    withSuffix: true
  }
);

const CompanyEditBasicPage = async ({ params }) => {
  const { profileSlug } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getProfileKey(profileSlug), () => getProfile(profileSlug));
  await queryClient.prefetchQuery(getProvincesKey(), getProvinces);
  await queryClient.prefetchQuery(getTotalEmployeesKey(), getTotalEmployees);
  await queryClient.prefetchQuery(getCompanyScopesKey(), getCompanyScopes);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <EditBasicForm />
    </Hydrate>
  );
};

export default CompanyEditBasicPage;

import { Hydrate, dehydrate } from '@tanstack/react-query';

import Register from '@/components/pages/Auth/Register';
import generateMetadata from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getCompanyScopesKey } from '@/query/companyScope';
import { getProvincesKey } from '@/query/location';
import { getTotalEmployeesKey } from '@/query/totalEmployee';
import { getCompanyScopes } from '@/repositories/companyScope';
import { getProvinces } from '@/repositories/location';
import { getTotalEmployees } from '@/repositories/totalEmployee';

export const metadata = generateMetadata(
  {
    title: 'Register'
  },
  {
    withSuffix: true
  }
);

const RegisterPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getProvincesKey(), getProvinces);
  await queryClient.prefetchQuery(getTotalEmployeesKey(), getTotalEmployees);
  await queryClient.prefetchQuery(getCompanyScopesKey(), getCompanyScopes());
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Register />
    </Hydrate>
  );
};

export default RegisterPage;

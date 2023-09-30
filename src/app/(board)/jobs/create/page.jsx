import FormJob from '@/components/pages/Jobs/Form';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';

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
  return <FormJob />;
};

export default CreateJobPage;

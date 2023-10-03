import Apply from '@/components/pages/Jobs/Apply';
import { ROLE } from '@/lib/constants/common';
import { pageAuthorization } from '@/lib/pageAuthorization';

const ApplyPage = async () => {
  await pageAuthorization([ROLE.USER]);

  return <Apply />;
};

export default ApplyPage;

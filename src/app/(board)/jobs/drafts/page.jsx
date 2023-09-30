import { ROLE } from '@/lib/constants/common';
import { pageAuthorization } from '@/lib/pageAuthorization';

const DraftsJobPage = async () => {
  await pageAuthorization([ROLE.COMPANY]);

  return (
    <div>
      <h1>DraftsJobPage</h1>
    </div>
  );
};

export default DraftsJobPage;

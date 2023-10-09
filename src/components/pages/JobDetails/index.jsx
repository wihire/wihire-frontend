import { getServerSession } from 'next-auth';

import { ButtonsCompanyActions } from '@/components/parts/Jobs/ButtonsCompanyActions';
import JobDetailsButtons from '@/components/parts/Jobs/JobDetailsButtons';
import JobDetailsContent from '@/components/parts/Jobs/JobDetailsContent';
import JobDetailsHeader from '@/components/parts/Jobs/JobDetailsHeader';
import { authOptions } from '@/lib/auth';
import { ROLE } from '@/lib/constants/common';

const JobDetails = async () => {
  const session = await getServerSession(authOptions);
  const profile = session?.profile;

  return (
    <div>
      {profile.role === ROLE.COMPANY ? <ButtonsCompanyActions /> : null}

      <div className="rounded-md bg-white p-8">
        <JobDetailsHeader />

        {profile.role === ROLE.USER ? <JobDetailsButtons /> : null}

        <div className="divider my-8" />

        <JobDetailsContent />
      </div>
    </div>
  );
};

export default JobDetails;

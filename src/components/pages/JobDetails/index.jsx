import dynamic from 'next/dynamic';

import { ButtonsCompanyActions } from '@/components/parts/Jobs/ButtonsCompanyActions';
import JobDetailsContent from '@/components/parts/Jobs/JobDetailsContent';
import JobDetailsHeader from '@/components/parts/Jobs/JobDetailsHeader';
import { ROLE } from '@/lib/constants/common';

const JobDetailsButtons = dynamic(() => import('@/components/parts/Jobs/JobDetailsButtons'));

const JobDetails = async ({ profile, createdBy }) => (
  <div>
    {profile.role === ROLE.COMPANY && profile.slug === createdBy ? <ButtonsCompanyActions /> : null}

    <div className="rounded-md bg-white p-8">
      <JobDetailsHeader />

      {profile.role === ROLE.USER ? <JobDetailsButtons /> : null}

      <div className="divider my-8" />

      <JobDetailsContent />
    </div>
  </div>
);

export default JobDetails;

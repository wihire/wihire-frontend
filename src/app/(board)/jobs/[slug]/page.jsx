import { Hydrate, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import JobDetails from '@/components/pages/JobDetails';
import { authOptions } from '@/lib/auth';
import { ROLE } from '@/lib/constants/common';
import { default as generateOwnMetadata } from '@/lib/metadata';
import { getQueryClient } from '@/lib/queryClient';
import { getApplicantCheckKey } from '@/query/applications';
import { getJobKey } from '@/query/jobs';
import { applyJobCheck } from '@/repositories/applications';
import { getJob } from '@/repositories/jobs';

export async function generateMetadata({ params }) {
  try {
    const { slug } = params;

    const jobData = await getJob(slug);
    const { job } = jobData.data.data;

    return generateOwnMetadata(
      {
        title: `${job.title} at ${job.company.profile.name}`
      },
      {
        withSuffix: true
      }
    );
  } catch (error) {
    return generateOwnMetadata(
      {
        title: 'Job Not Found'
      },
      {
        withSuffix: true
      }
    );
  }
}

const JobDetailsPage = async ({ params }) => {
  try {
    const { slug } = params;

    const session = await getServerSession(authOptions);
    const profile = session?.profile;

    const jobData = await getJob(slug);

    const queryClient = getQueryClient();
    await queryClient.setQueryData(getJobKey(slug), jobData);

    if (profile.role === ROLE.USER) {
      await queryClient.prefetchQuery(getApplicantCheckKey(slug), () => applyJobCheck(slug));
    }

    const dehydratedState = dehydrate(queryClient);

    return (
      <Hydrate state={dehydratedState}>
        <JobDetails profile={profile} createdBy={jobData.data.data.job.company.profile.slug} />
      </Hydrate>
    );
  } catch (error) {
    if (error?.type === 'NOT_FOUND_ERR') {
      return notFound();
    }

    throw Error(error?.message);
  }
};

export default JobDetailsPage;

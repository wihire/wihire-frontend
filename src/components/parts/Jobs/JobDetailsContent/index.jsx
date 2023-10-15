'use client';

import { useMemo } from 'react';

import { useParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import DangerousHTML from '@/components/parts/DangerousHTML';
import { useJob } from '@/query/jobs';

const JobDetailsContent = () => {
  const params = useParams();

  const { data } = useJob(params.slug);

  const { job } = useMemo(() => data.data.data, [data.data.data]);

  return (
    <div className="flex flex-col gap-5">
      {job.description ? (
        <div>
          <Text as="h2" typography="h3" className="mb-1">
            Job Description
          </Text>

          <DangerousHTML html={job.description} />
        </div>
      ) : null}

      {job.minimumQualification ? (
        <div>
          <Text as="h2" typography="h3" className="mb-1">
            Minimum Qualification
          </Text>

          <DangerousHTML html={job.minimumQualification} />
        </div>
      ) : null}

      {job.benefits ? (
        <div>
          <Text as="h2" typography="h3" className="mb-1">
            Benefits
          </Text>

          <DangerousHTML html={job.benefits} />
        </div>
      ) : null}

      <div>
        <Text as="h2" typography="h3" className="mb-1">
          Skills
        </Text>
        <Text>{job.skills.join(', ')}</Text>
      </div>

      <div>
        <Text as="h2" typography="h3" className="mb-1">
          Categories
        </Text>
        <Text>{job.categories.join(', ')}</Text>
      </div>
    </div>
  );
};

export default JobDetailsContent;

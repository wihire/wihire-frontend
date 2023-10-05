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
      {job.description || job.minimumQualification || job.benefits ? (
        <>
          {job.description ? (
            <div>
              <Text as="h2" typography="h3" className="mb-2">
                Job Description
              </Text>

              <DangerousHTML html={job.description} />
            </div>
          ) : null}

          {job.minimumQualification ? (
            <div>
              <Text as="h2" typography="h3" className="mb-2">
                Minimum Qualification
              </Text>

              <DangerousHTML html={job.minimumQualification} />
            </div>
          ) : null}

          {job.benefits ? (
            <div>
              <Text as="h2" typography="h3" className="mb-2">
                Benefits
              </Text>

              <DangerousHTML html={job.benefits} />
            </div>
          ) : null}

          {job.skills ? (
            <div>
              <Text as="h2" typography="h3" className="mb-2">
                Skills
              </Text>

              <DangerousHTML html={job.skills.join(', ')} />
            </div>
          ) : null}

          {job.categories ? (
            <div>
              <Text as="h2" typography="h3" className="mb-2">
                Categories
              </Text>

              <DangerousHTML html={job.categories.join(', ')} />
            </div>
          ) : null}
        </>
      ) : (
        <Text as="h2" typography="h3" className="mb-2">
          No description provided
        </Text>
      )}
    </div>
  );
};

export default JobDetailsContent;

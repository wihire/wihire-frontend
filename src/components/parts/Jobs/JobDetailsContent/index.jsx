'use client';

import { useMemo } from 'react';

/* eslint-disable react/no-danger */
import * as dompurify from 'isomorphic-dompurify';
import { useParams } from 'next/navigation';

import Text from '@/components/elements/Text';
import { useJob } from '@/query/jobs';

import styles from './style.module.scss';

const sanitizer = dompurify.sanitize;

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

              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: sanitizer(job.description) }}
              />
            </div>
          ) : null}

          {job.minimumQualification ? (
            <div>
              <Text as="h2" typography="h3" className="mb-2">
                Minimum Qualification
              </Text>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: sanitizer(job.minimumQualification) }}
              />
            </div>
          ) : null}

          {job.benefits ? (
            <div>
              <Text as="h2" typography="h3" className="mb-2">
                Benefits
              </Text>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: sanitizer(job.benefits) }}
              />
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

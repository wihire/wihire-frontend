'use client';

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

  const { job } = data.data.data;

  return (
    <div className="flex flex-col gap-5">
      {job.description ? (
        <div>
          <Text typography="h3" className="mb-2">
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
          <Text typography="h3" className="mb-2">
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
          <Text typography="h3" className="mb-2">
            Benefits
          </Text>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: sanitizer(job.benefits) }}
          />
        </div>
      ) : null}
    </div>

    // <div>
    //   <Text typography="h3" className="mb-2">
    //     {title}
    //   </Text>
    //   <div
    //     className={styles.content}
    //     dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    //   />
    // </div>
  );
};

export default JobDetailsContent;

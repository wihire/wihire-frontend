import { useMemo } from 'react';

import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import Text from '@/components/elements/Text';
import { toCurrency, capitalEachWord, splitStatus } from '@/lib/common';
import config from '@/lib/config';

const ApplicationCard = ({ job, status, companyPicture }) => {
  const statusBadge = useMemo(() => {
    if (status === 'ONPROGRESS') {
      return 'border border-primary';
    }
    if (status === 'ONREVIEW') {
      return 'bg-warning';
    }
    if (status === 'APPROVED') {
      return 'bg-success';
    }

    return 'bg-error';
  }, [status]);

  const statusText = useMemo(() => {
    if (status === 'ONPROGRESS') {
      return 'text-primary';
    }
    return 'text-white';
  }, [status]);

  return (
    <div className="flex flex-wrap justify-between bg-white p-3 rounded-md">
      <div className="flex flex-row gap-3 ">
        <Image
          className="self-start rounded-xl "
          src={companyPicture ?? config.defaultAvatar}
          alt="Movie"
          width={80}
          height={80}
        />

        <div className="flex flex-col gap-2">
          <div>
            <Link
              href={`/jobs/${job.slug}`}
              className="inline-block text-xl font-bold text-primary"
            >
              {job.title}
            </Link>
            <Text typography="sm">{job.company.profile.name}</Text>
          </div>

          <div>
            <div>
              <Text typography="sm" className="inline-block text-gray-500">
                {job.province}({job.placeMethod.toLowerCase()})
              </Text>
              <ul className="ml-8 inline-block list-disc">
                <Text as="li" typography="sm" className="text-gray-500">
                  {capitalEachWord(job.jobType)}
                </Text>
              </ul>
            </div>

            <Text typography="sm" className="text-gray-500">
              {job?.rangeSalary ? toCurrency(job.rangeSalary?.min, true) : null}
              {job.rangeSalary?.max ? ` - ${toCurrency(job.rangeSalary?.max, true)}` : null}
              {job?.rangeSalary && 'IDR / month'}
            </Text>
          </div>

          <div>
            <Text typography="xs" className="text-gray-500">
              {moment(job.createdAt).fromNow()}
            </Text>
          </div>
        </div>
      </div>

      <div className={twMerge('rounded-full justify h-8 px-4 py-1', statusBadge)}>
        <div className={twMerge('self-center h-8', statusText)}>
          {capitalEachWord(splitStatus(status))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;

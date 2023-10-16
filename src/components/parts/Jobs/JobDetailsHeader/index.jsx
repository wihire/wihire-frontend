'use client';

import { useMemo } from 'react';

import cx from 'classnames';
import moment from 'moment';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import BankNotesIcon from '@/assets/icons/banknotes_solid.svg';
import BriefCaseIcon from '@/assets/icons/briefcase_solid.svg';
import ClockIcon from '@/assets/icons/clock_solid.svg';
import MapPinIcon from '@/assets/icons/map-pin_solid.svg';
import Image from '@/components/elements/Image';
import Text from '@/components/elements/Text';
import { toCurrency, capitalEachWord } from '@/lib/common';
import config from '@/lib/config';
import { JOB_TYPE, JOB_STATUS } from '@/lib/constants/common';
import { useJob } from '@/query/jobs';

const JobDetailsHeader = () => {
  const params = useParams();

  const { data } = useJob(params.slug);

  const { job } = useMemo(() => data.data.data, [data.data.data]);
  const { company } = useMemo(() => job, [job]);

  return (
    <div className="relative">
      {job.status !== 'POSTED' ? (
        <div
          className={cx('badge badge-lg mb-3', {
            'badge-warning': job.status === 'DRAFT',
            'badge-error': job.status === 'CLOSED'
          })}
        >
          {JOB_STATUS[job.status]}
        </div>
      ) : null}

      <div className="grid gap-3">
        <div>
          <Text typography="h2" as="h1">
            {job.title}
          </Text>

          <div className="mt-1 flex-col md:flex md:flex-row md:gap-8">
            <Link
              href={`/profile/${company.profile.slug}`}
              className="text-primary hover:underline"
            >
              {company.profile.name}
            </Link>
            <ul className="md:list-disc">
              <Text as="li">{company.totalEmployee}</Text>
            </ul>
          </div>

          <Text typography="xs" className="text-gray-500">
            {moment(job.createdAt).fromNow()}
          </Text>
        </div>

        <Image
          src={company.profile?.avatar ?? config.defaultAvatar}
          width={112}
          height={112}
          alt="Avatar Company"
          className="order-first h-16 w-16 object-cover
            md:absolute md:right-0 md:top-0 md:order-none md:h-28 md:w-28 md:place-self-end"
        />

        <div className="flex flex-1 flex-col gap-1 text-gray-500">
          <div className="flex items-center gap-1">
            <MapPinIcon />
            <Text>
              {capitalEachWord(job.address)}, {job.province}
            </Text>
          </div>

          <div className="flex items-center gap-1">
            <BriefCaseIcon />
            <Text>{capitalEachWord(job.placeMethod)}</Text>
          </div>

          <div className="flex items-center gap-1">
            <ClockIcon />
            <Text>{JOB_TYPE[job.jobType]}</Text>
          </div>

          {job.rangeSalary ? (
            <div className="flex items-center gap-1">
              <BankNotesIcon />
              <Text>
                {toCurrency(job.rangeSalary.min, true)}
                {job.rangeSalary.max ? ` - ${toCurrency(job.rangeSalary.max, true)}` : null} IDR /
                month
              </Text>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsHeader;

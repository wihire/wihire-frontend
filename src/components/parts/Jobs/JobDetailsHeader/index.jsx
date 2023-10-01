'use client';

import { useMemo } from 'react';

import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import BankNotesIcon from '@/assets/icons/banknotes_solid.svg';
import BriefCaseIcon from '@/assets/icons/briefcase_solid.svg';
import ClockIcon from '@/assets/icons/clock_solid.svg';
import MapPinIcon from '@/assets/icons/map-pin_solid.svg';
import Text from '@/components/elements/Text';
import { toCurrency, capitalEachWord } from '@/lib/common';
import config from '@/lib/config';
import { JOB_TYPE } from '@/lib/constants/common';
import { useJob } from '@/query/jobs';

const JobDetailsHeader = () => {
  const params = useParams();

  const { data } = useJob(params.slug);

  const { job } = useMemo(() => data.data.data, [data.data.data]);
  const { company } = useMemo(() => job, [job]);

  return (
    <div className="grid grid-cols-2">
      <div>
        <Text typography="h2" as="h1">
          {job.title}
        </Text>

        <div className="mt-1 flex gap-8">
          <Link href={`/profile/${company.profile.slug}`} className="text-primary hover:underline">
            {company.profile.name}
          </Link>
          <ul className="list-disc">
            <Text as="li">{company.totalEmployee}</Text>
          </ul>
        </div>

        <Text typography="xs" className="text-gray-500">
          {moment(job.createdAt).fromNow()}
        </Text>
      </div>

      <div className="relative h-[100px] w-[100px] place-self-end">
        <Image
          src={company.profile?.avatar ?? config.defaultAvatar}
          fill
          alt="Avatar Company"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <MapPinIcon />
          <Text>{job.address}</Text>
        </div>

        <div className="flex items-center gap-2">
          <BriefCaseIcon />
          <Text>{capitalEachWord(job.placeMethod)}</Text>
        </div>

        <div className="flex items-center gap-2">
          <ClockIcon />
          <Text>{JOB_TYPE[job.jobType]}</Text>
        </div>

        {job.rangeSalary ? (
          <div className="flex items-center gap-2">
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
  );
};

export default JobDetailsHeader;

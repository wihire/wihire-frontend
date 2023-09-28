'use client';

import moment from 'moment';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import BankNotesIcon from '@/assets/icons/banknotes_solid.svg';
import BriefCaseIcon from '@/assets/icons/briefcase_solid.svg';
import ClockIcon from '@/assets/icons/clock_solid.svg';
import MapPinIcon from '@/assets/icons/map-pin_solid.svg';
import Text from '@/components/elements/Text';
import { toCurrency, capitalEachWord } from '@/lib/common';
import { useJob } from '@/query/jobs';

const JOB_TYPE = {
  FULLTIME: 'Fulltime',
  PARTTIME: 'Part time',
  INTERNSHIP: 'Internship',
  CONTRACT: 'Contract'
};

const JobDetailsHeader = () => {
  const params = useParams();

  const { data } = useJob(params.slug);

  const { job } = data.data.data;
  const { company } = job;

  return (
    <div className="grid grid-cols-2">
      <div>
        <Text typography="h2" as="h1">
          {job.title}
        </Text>

        <div className="flex gap-8 ">
          <Text className="text-primary">{company.profile.name}</Text>
          <ul className="list-disc">
            <Text as="li">{company.totalEmployee}</Text>
          </ul>
        </div>

        <div>
          <Text className="text-gray-500">{moment(job.createdAt).fromNow()}</Text>
        </div>
      </div>

      <div className="flex justify-end">
        <Image src={company.profile.avatar} width={100} height={100} alt="Avatar Company" />
      </div>

      <div>
        <div className="flex items-center gap-3">
          <MapPinIcon />
          <Text>{job.address}</Text>
        </div>

        <div className="flex items-center gap-3">
          <BriefCaseIcon />
          <Text>{capitalEachWord(job.placeMethod)}</Text>
        </div>

        <div className="flex items-center gap-3">
          <ClockIcon />
          <Text>{JOB_TYPE[job.jobType]}</Text>
        </div>

        {job.rangeSalary ? (
          <div className="flex items-center gap-3">
            <BankNotesIcon />
            <Text typography="sm">
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

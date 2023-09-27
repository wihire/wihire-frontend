import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

import BookmarkOutlineIcon from '@/assets/icons/bookmark_outline.svg';
import BookmarkSolidIcon from '@/assets/icons/bookmark_solid.svg';
import Button from '@/components/elements/Button';
import Text from '@/components/elements/Text';
import { toCurrency } from '@/lib/common';
import config from '@/lib/config';
import { saveJob, unsaveJob } from '@/repositories/jobs';

const JOB_TYPE = {
  FULLTIME: 'Fulltime',
  PARTTIME: 'Part time',
  INTERNSHIP: 'Internship',
  CONTRACT: 'Contract'
};

const JobCard = ({
  title,
  slug,
  companyImage,
  companyName,
  address,
  placeMethod,
  jobType,
  rangeSalary,
  isSaved,
  createdAt
}) => {
  const [isSavedJob, setIsSavedJob] = useState(isSaved);

  const saveMutation = useMutation({
    mutationFn: () => saveJob(slug),
    onSuccess: () => setIsSavedJob(true)
  });

  const unsaveMutation = useMutation({
    mutationFn: () => unsaveJob(slug, false),
    onSuccess: () => setIsSavedJob(false)
  });

  return (
    <div className="flex gap-3 rounded-lg bg-white px-4 py-5">
      <div className="relative h-20 w-20">
        <Image
          src={companyImage ?? config.defaultAvatar}
          alt="Company image"
          layout="fill"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <Link href={`/jobs/${slug}`} className="inline-block text-xl font-bold text-primary">
            {title}
          </Link>
          <Text typography="sm">{companyName}</Text>
        </div>

        <div>
          <div>
            <Text typography="sm" className="inline-block text-gray-500">
              {address} ({placeMethod.toLowerCase()})
            </Text>
            <ul className="ml-8 inline-block list-disc">
              <Text as="li" typography="sm" className="text-gray-500">
                {JOB_TYPE[jobType]}
              </Text>
            </ul>
          </div>

          {rangeSalary ? (
            <div>
              <Text typography="sm" className="text-gray-500">
                {toCurrency(rangeSalary.min, true)}
                {rangeSalary.max ? ` - ${toCurrency(rangeSalary.max, true)}` : null} IDR / month
              </Text>
            </div>
          ) : null}
        </div>

        <Text typography="xs" className="text-gray-500">
          {moment(createdAt).fromNow()}
        </Text>
      </div>

      {isSavedJob ? (
        <Button
          className="btn-ghost text-primary"
          title="Unsave this job"
          onClick={() => unsaveMutation.mutate()}
          isLoading={unsaveMutation.isLoading}
        >
          <BookmarkSolidIcon />
        </Button>
      ) : (
        <Button
          className="btn-ghost"
          title="Save this job"
          onClick={() => saveMutation.mutate()}
          isLoading={saveMutation.isLoading}
        >
          <BookmarkOutlineIcon />
        </Button>
      )}
    </div>
  );
};

export default JobCard;

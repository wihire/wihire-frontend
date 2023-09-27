import Image from 'next/image';
import Link from 'next/link';

import Text from '@/components/elements/Text';
import config from '@/lib/config';
import { toCurrency } from '@/lib/common';
import moment from 'moment';
import Button from '@/components/elements/Button';
import BookmarkOutlineIcon from '@/assets/icons/bookmark_outline.svg';
import BookmarkSolidIcon from '@/assets/icons/bookmark_solid.svg';

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
  return (
    <div className="px-4 py-5 bg-white rounded-lg flex gap-3">
      <div className="relative w-20 h-20">
        <Image
          src={companyImage ?? config.defaultAvatar}
          alt="Company image"
          layout="fill"
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div>
          <Link href={`/jobs/${slug}`} className="text-primary font-bold text-xl inline-block">
            {title}
          </Link>
          <Text typography="sm">{companyName}</Text>
        </div>

        <div>
          <div>
            <Text typography="sm" className="inline-block text-gray-500">
              {address} ({placeMethod.toLowerCase()})
            </Text>
            <ul className="list-disc inline-block ml-8">
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

        <Text typography="xs" className="text-gray-500">{moment(createdAt).fromNow()}</Text>
      </div>

      {isSaved ? (
        <Button className="btn-ghost text-primary" title="Unsave this job">
          <BookmarkSolidIcon />
        </Button>
      ) : (
        <Button className="btn-ghost" title="Save this job">
          <BookmarkOutlineIcon />
        </Button>
      )}
    </div>
  );
};

export default JobCard;

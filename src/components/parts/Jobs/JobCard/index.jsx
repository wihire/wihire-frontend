import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

import Text from '@/components/elements/Text';
import { toCurrency } from '@/lib/common';
import config from '@/lib/config';
import { JOB_TYPE } from '@/lib/constants/common';

const JobCard = ({
  title,
  slug,
  companyImage,
  companyName,
  address,
  placeMethod,
  jobType,
  rangeSalary,
  createdAt,
  renderRightContent
}) => (
  <div className="fle  <div className="flex gap-3 rounded-lg bg-white px-4 py-5">
    <div className="relative h-20 w-20">
      <Image
        src={companyImage ?? config.defaultAvatar}
        alt="Company image"
        fill
        className="object-cover"
      />
    </div>

    <div className="flex flex-1 flex-col gap-3">
      <div>
        <Link href={`/jobs/${slug}`} className="inline-block text-xl font-bold text-primary">
          {title}
        </Link>
        <Text>{companyName}</Text>
      </div>

      <div>
        <div>
          <Text className="inline-block text-gray-500">
            {address} ({placeMethod.toLowerCase()})
          </Text>
          <ul className="ml-8 inline-block list-disc">
            <Text as="li" className="text-gray-500">
              {JOB_TYPE[jobType]}
            </Text>
          </ul>
        </div>

        {rangeSalary ? (
          <div>
            <Text className="text-gray-500">
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

    {renderRightContent ? <div className="self-start">{renderRightContent}</div> : null}

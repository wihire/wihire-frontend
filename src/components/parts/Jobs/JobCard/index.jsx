import moment from 'moment';
import Link from 'next/link';

import Image from '@/components/elements/Image';
import Text from '@/components/elements/Text';
import { toCurrency, capitalEachWord } from '@/lib/common';
import config from '@/lib/config';
import { JOB_TYPE } from '@/lib/constants/common';

const JobCard = ({
  title,
  slug,
  companyImage,
  companyName,
  province,
  address,
  placeMethod,
  jobType,
  rangeSalary,
  createdAt,
  renderRightContent
}) => (
  <div
    className="flex flex-wrap items-start gap-3 rounded-lg
      bg-white px-4 py-5 md:gap-5"
  >
    <Image
      src={companyImage ?? config.defaultAvatar}
      alt="Company image"
      width={80}
      height={80}
      className="h-10 w-10 object-cover sm:h-16 sm:w-16 md:h-20 md:w-20"
    />

    <div className="flex flex-1 flex-col justify-center gap-3 ">
      <div>
        <Link
          href={`/jobs/${slug}`}
          className="inline-block text-sm font-bold text-primary sm:text-xl"
        >
          {title}
        </Link>
        <Text>{companyName}</Text>
      </div>

      <div>
        <div>
          <Text className="inline-block text-gray-500">
            {capitalEachWord(address)}, {province} ({placeMethod.toLowerCase()})
          </Text>

          <ul className="inline lg:ml-8 lg:inline-block lg:list-disc">
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

    {renderRightContent ? <div>{renderRightContent}</div> : null}
  </div>
);

export default JobCard;

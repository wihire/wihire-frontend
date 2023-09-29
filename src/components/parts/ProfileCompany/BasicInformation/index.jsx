'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import LocationIcon from '@/assets/icons/location_solid.svg';
import MailIcon from '@/assets/icons/mail_solid.svg';
import UserIcon from '@/assets/icons/user_solid.svg';
import Text from '@/components/elements/Text';
import config from '@/lib/config';
import { useProfile } from '@/query/profile';

const BasicInformation = ({ className }) => {
  const params = useParams();

  const { data } = useProfile(params.companySlug);

  return (
    <div className={twMerge('flex gap-3', className)}>
      <div className="relative mr-3 h-36 w-36">
        <Image
          src={data?.data?.data?.profile?.avatar ?? config.defaultAvatar}
          alt="Profile image"
          layout="fill"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Text typography="md">{data?.data?.data?.profile?.name}</Text>
        <Text>{data?.data?.data?.profile?.company?.headline}</Text>
        <Text>{data?.data?.data?.profile?.company?.companyScope}</Text>
        <div className="flex">
          <UserIcon className="mr-2 mt-1 text-primary" />
          <Text typography="xs" className="inline-block text-gray-500">
            {data?.data?.data?.profile?.company?.totalEmployee},
          </Text>
        </div>
        <div className="-mt-3 flex">
          <LocationIcon className="mr-2 mt-1 text-primary" />
          <Text typography="xs" className="inline-block text-gray-500">
            {data?.data?.data?.profile?.province},
          </Text>
          <Text typography="xs" className="ml-1.5 inline-block text-gray-500">
            {data?.data?.data?.profile?.address}
          </Text>
        </div>
        <div className="-mt-3 flex text-primary">
          <MailIcon className="mr-2 mt-1" />
          <Text typography="xs" className="inline-block text-gray-500">
            {data?.data?.data?.profile?.email},
          </Text>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;

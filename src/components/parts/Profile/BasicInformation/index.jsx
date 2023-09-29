'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import LocationIcon from '@/assets/icons/location-icon.svg';
import MailIcon from '@/assets/icons/mail_solid.svg';
import PhoneIcon from '@/assets/icons/phone_solid.svg';
import Text from '@/components/elements/Text';
import config from '@/lib/config';
import { useProfile } from '@/query/profile';

const BasicInformation = ({ className }) => {
  const params = useParams();

  const { data } = useProfile(params.userSlug);

  return (
    <div className={twMerge('flex gap-3 rounded-lg bg-white px-4 py-5', className)}>
      <div className="relative h-36 w-36">
        <Image
          src={data?.data?.data?.profile?.avatar ?? config.defaultAvatar}
          alt="Profile image"
          layout="fill"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Text typography="md">{data?.data?.data?.profile?.name}</Text>
        <Text>{data?.data?.data?.profile.user?.headline}</Text>
        <div className="flex">
          <LocationIcon className="mr-2 mt-1" />
          <Text typography="sm" className="inline-block text-gray-500">
            {data?.data?.data?.profile?.province},
          </Text>
          <Text typography="sm" className="ml-1.5 inline-block text-gray-500">
            {data?.data?.data?.profile?.address}
          </Text>
        </div>
        <div>
          <div className="flex items-center justify-end gap-3">
            <Text typography="sm" className="inline-block text-gray-500">
              {data?.data?.data?.profile?.user?.phoneNumber}
            </Text>
            <PhoneIcon className="text-primary" />
          </div>
          <div className="flex items-center justify-end gap-3">
            <Text typography="sm" className="inline-block text-gray-500">
              {data?.data?.data?.profile?.email}
            </Text>
            <MailIcon className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;

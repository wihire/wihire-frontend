'use client';

import { useMemo } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import LocationIcon from '@/assets/icons/location_solid.svg';
import MailIcon from '@/assets/icons/mail_solid.svg';
import UserIcon from '@/assets/icons/user_solid.svg';
import Text from '@/components/elements/Text';
import config from '@/lib/config';
import { useProfile } from '@/query/profile';

const WebsiteIcon = dynamic(() => import('@/assets/icons/globe-alt_solid.svg'));

const BasicInformation = () => {
  const params = useParams();

  const { data } = useProfile(params.profileSlug);
  const profile = useMemo(() => data?.data?.data?.profile, [data]);

  return (
    <div className="flex gap-3">
      <div className="relative mr-3 h-36 w-36">
        <Image
          src={profile?.avatar ?? config.defaultAvatar}
          alt="Profile image"
          layout="fill"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div>
          <Text as="h1" typography="h2">
            {profile?.name}
          </Text>

          <div className="badge badge-primary badge-outline mt-1">
            {profile?.company?.companyScope}
          </div>
        </div>

        {profile?.company?.headline ? <Text>{profile.company.headline}</Text> : null}

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <UserIcon className="text-gray-500" />
            <Text typography="xs" className="text-gray-500">
              {profile?.company?.totalEmployee}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <LocationIcon className="text-gray-500" />
            <Text typography="xs" className=" text-gray-500">
              {profile?.address}, {profile?.province}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <MailIcon className="text-gray-500" />
            <Text typography="xs" className="text-gray-500">
              {profile?.email}
            </Text>
          </div>

          {profile?.company?.websiteLink ? (
            <div className="flex items-center gap-2">
              <WebsiteIcon className="text-gray-500" />
              <a
                href={profile.company.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover link-primary link text-sm"
              >
                {profile.company.websiteLink}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;

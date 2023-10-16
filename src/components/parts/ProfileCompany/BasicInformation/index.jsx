'use client';

import { useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import LocationIcon from '@/assets/icons/location_solid.svg';
import MailIcon from '@/assets/icons/mail_solid.svg';
import PencilIcon from '@/assets/icons/pencil_solid.svg';
import UserIcon from '@/assets/icons/user_solid.svg';
import Button from '@/components/elements/Button';
import Image from '@/components/elements/Image';
import Text from '@/components/elements/Text';
import { capitalEachWord } from '@/lib/common';
import config from '@/lib/config';
import { useProfile } from '@/query/profile';

const WebsiteIcon = dynamic(() => import('@/assets/icons/globe-alt_solid.svg'));

const BasicInformation = () => {
  const params = useParams();
  const { data: loggedData, status } = useSession();

  const { data } = useProfile(params.profileSlug);
  const profile = useMemo(() => data?.data?.data?.profile, [data]);

  const isOwnProfile = useMemo(
    () => status === 'authenticated' && loggedData?.profile?.id === profile?.id,
    [status, loggedData?.profile?.id, profile?.id]
  );

  return (
    <div className="relative flex gap-5">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        <Image
          src={profile?.avatar ?? config.defaultAvatar}
          alt="Profile image"
          width={112}
          height={112}
          className="h-16 w-16 object-cover md:h-28 md:w-28"
        />

        <div className="flex flex-col gap-2">
          <header>
            <Text as="h1" typography="h2">
              {profile?.name}
            </Text>

            <div className="badge badge-primary badge-outline mt-1">
              {profile?.company?.companyScope}
            </div>
          </header>

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
                {capitalEachWord(profile?.address)}, {profile?.province}
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
                  className="link-hover link-primary link text-xs md:text-sm"
                >
                  {profile.company.websiteLink}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {isOwnProfile ? (
        <Button
          href={`${params.profileSlug}/company/edit/basic`}
          className="btn-ghost right-0 top-0"
        >
          <PencilIcon className="text-base" />
        </Button>
      ) : null}
    </div>
  );
};

export default BasicInformation;

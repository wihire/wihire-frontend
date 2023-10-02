'use client';

import moment from 'moment';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import CakeIcon from '@/assets/icons/cake_solid.svg';
import LocationIcon from '@/assets/icons/location-icon.svg';
import MailIcon from '@/assets/icons/mail_solid.svg';
import PhoneIcon from '@/assets/icons/phone_solid.svg';
import Text from '@/components/elements/Text';
import config from '@/lib/config';

const WebsiteIcon = dynamic(() => import('@/assets/icons/globe-alt_solid.svg'));

const BasicInformation = ({ profile }) => (
  <section className="flex flex-col rounded-md bg-white p-8">
    <div className="flex gap-3">
      <div className="relative h-28 w-28">
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
            {profile?.name} ({profile?.user?.gender === 'MALE' ? 'He' : 'She'})
          </Text>

          {profile?.user?.headline ? <Text>{profile.user.headline}</Text> : null}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <LocationIcon className="text-gray-500" />
            <Text typography="xs" className=" text-gray-500">
              {profile?.address}, {profile?.province}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <PhoneIcon className="text-gray-500" />
            <Text typography="xs" className=" text-gray-500">
              {profile?.user?.phoneNumber}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <MailIcon className="text-gray-500" />
            <Text typography="xs" className=" text-gray-500">
              {profile?.email}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <CakeIcon className="text-gray-500" />
            <Text typography="xs" className=" text-gray-500">
              {moment(profile?.user?.birthDate).format('DD MMMM YYYY')}
            </Text>
          </div>

          {profile?.user?.url ? (
            <div className="flex items-center gap-2">
              <WebsiteIcon className="text-gray-500" />
              <a
                href={profile.user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover link-primary link text-sm"
              >
                {profile.user.url}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>

    {profile?.user?.about ? (
      <>
        <div className="divider" />

        <div>
          <Text as="h2" typography="h3" className="mb-2">
            About
          </Text>
          <Text>{profile.user.about}</Text>
        </div>
      </>
    ) : null}
  </section>
);

export default BasicInformation;

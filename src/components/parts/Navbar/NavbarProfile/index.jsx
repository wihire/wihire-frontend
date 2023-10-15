/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { twMerge } from 'tailwind-merge';

import ChevronDown from '@/assets/icons/chevron-down.svg';
import Image from '@/components/elements/Image';
import Text from '@/components/elements/Text';
import LogoutButton from '@/components/parts/Navbar/LogoutButton';
import { authOptions } from '@/lib/auth';
import config from '@/lib/config';

const NavbarProfile = async ({ className }) => {
  const session = await getServerSession(authOptions);
  const profile = session?.profile;

  return (
    <div className={twMerge('dropdown dropdown-end', className)}>
      <label tabIndex={0} className="flex cursor-pointer items-center gap-2">
        <Text typography="h4">{profile?.name}</Text>

        <Image
          src={profile?.avatar ?? config.defaultAvatar}
          alt={`${profile?.name}'s avatar`}
          width={40}
          height={40}
          className="avatar overflow-hidden rounded-full object-cover"
          shimmerClassName="rounded-full overflow-hidden"
        />
        <ChevronDown />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-lg bg-white p-2 shadow"
      >
        <li>
          <Link href={`/profile/${profile?.slug}`}>Profile</Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
};

export default NavbarProfile;

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable max-len */
import Image from 'next/image';
import Link from 'next/link';

import ChevronDown from '@/assets/icons/chevron-down.svg';
import Text from '@/components/elements/Text';
import config from '@/lib/config';

const NavbarProfile = () => (
  <div className="dropdown dropdown-end">
    <label tabIndex={0} className="flex cursor-pointer items-center gap-2">
      <Text typography="h4">Tarmizi</Text>

      <Image
        src={config.defaultAvatar}
        alt="Tarmizi's avatar"
        width={40}
        height={40}
        className="avatar overflow-hidden rounded-full object-cover"
      />
      <ChevronDown />
    </label>
    <ul
      tabIndex={0}
      className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-lg bg-white p-2 shadow"
    >
      <li>
        <Link href="/profile/a">Profile</Link> {/* ! ganti nanti */}
      </li>
      <li>
        <btn className="text-error hover:text-error">Logout</btn>
      </li>
    </ul>
  </div>
);

export default NavbarProfile;

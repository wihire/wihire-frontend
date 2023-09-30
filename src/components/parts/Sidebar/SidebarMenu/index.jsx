'use client';

import { useMemo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const SidebarMenu = ({ url, iconActive: IconActive, iconNotActive: IconNotActive, title }) => {
  const pathname = usePathname();

  const isActiveMenu = useMemo(() => pathname === url, [pathname, url]);

  const activeMenuClassName = useMemo(() => {
    if (isActiveMenu) {
      return 'text-primary font-bold';
    }

    return '';
  }, [isActiveMenu]);

  const afterActiveClassName = useMemo(
    () =>
      twMerge(
        'after:absolute after:bottom-0 after:right-0',
        'after:h-full after:w-1 after:bg-primary after:rounded-md'
      ),
    []
  );

  return (
    <li
      className={twMerge(
        'px-6 py-2 hover:text-primary hover:font-bold relative',
        isActiveMenu ? afterActiveClassName : '',
        activeMenuClassName
      )}
    >
      <Link href={url} className="flex gap-1">
        {isActiveMenu ? (
          <IconActive className="text-2xl" />
        ) : (
          <IconNotActive className="text-2xl" />
        )}

        {title}
      </Link>
    </li>
  );
};

export default SidebarMenu;

'use client';

import { useEffect, useRef } from 'react';

import { twMerge } from 'tailwind-merge';

import BookmarkIcon from '@/assets/icons/bookmark_solid.svg';
import BriefcaseIcon from '@/assets/icons/briefcase_solid.svg';
import DocumentIcon from '@/assets/icons/document_solid.svg';
import SidebarMenu from '@/components/parts/Sidebar/SidebarMenu';

const MENU = [
  {
    title: 'Job Board',
    icon: BriefcaseIcon,
    url: '/jobs'
  },
  {
    title: 'Applications',
    icon: DocumentIcon,
    url: '/applications'
  },
  {
    title: 'Saved Jobs',
    icon: BookmarkIcon,
    url: '/saved-jobs'
  }
];

const SidebarBoardUser = ({ className }) => {
  const asideRef = useRef(null);

  useEffect(() => {
    if (!asideRef.current) return;

    const { offsetTop } = asideRef.current;

    asideRef.current.style.top = `${offsetTop}px`;
  }, [asideRef]);

  return (
    <aside ref={asideRef} className={twMerge('bg-white rounded-md py-7 sticky', className)}>
      <nav>
        <ul className="flex flex-col gap-3">
          {MENU.map((menu) => (
            <SidebarMenu key={menu.url} {...menu} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarBoardUser;

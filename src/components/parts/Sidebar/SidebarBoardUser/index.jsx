'use client';

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

const SidebarBoardUser = ({ className }) => (
  <aside className={twMerge('bg-white rounded-md py-7', className)}>
    <nav>
      <ul className="flex flex-col gap-3">
        {MENU.map((menu) => (
          <SidebarMenu key={menu.url} {...menu} />
        ))}
      </ul>
    </nav>
  </aside>
);

export default SidebarBoardUser;

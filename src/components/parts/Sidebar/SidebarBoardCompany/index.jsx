'use client';

import { useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';
import { twMerge } from 'tailwind-merge';

import SidebarMenu from '@/components/parts/Sidebar/SidebarMenu';

const PencilIconSolid = dynamic(() => import('@/assets/icons/pencil_solid.svg'));
const PencilIconOutline = dynamic(() => import('@/assets/icons/pencil_outline.svg'));
const BriefcaseIconSolid = dynamic(() => import('@/assets/icons/briefcase_solid.svg'));
const BriefcaseIconOutline = dynamic(() => import('@/assets/icons/briefcase_outline.svg'));
const DocumentIconSolid = dynamic(() => import('@/assets/icons/document_solid.svg'));
const DocumentIconOutline = dynamic(() => import('@/assets/icons/document_outline.svg'));

const MENU = [
  {
    title: 'List Job',
    iconActive: BriefcaseIconSolid,
    iconNotActive: BriefcaseIconOutline,
    url: '/jobs'
  },
  {
    title: 'Create Job',
    iconActive: PencilIconSolid,
    iconNotActive: PencilIconOutline,
    url: '/jobs/create'
  },
  {
    title: 'Draft Job',
    iconActive: DocumentIconSolid,
    iconNotActive: DocumentIconOutline,
    url: '/jobs/drafts'
  }
];

const SidebarBoardCompany = ({ className }) => {
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

export default SidebarBoardCompany;

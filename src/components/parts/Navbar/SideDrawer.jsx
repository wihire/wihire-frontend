import dynamic from 'next/dynamic';
import { getServerSession } from 'next-auth';

import Burger from '@/assets/icons/bars-3.svg';
import { authOptions } from '@/lib/auth';
import { ROLE } from '@/lib/constants/common';

import NavbarProfile from './NavbarProfile';

const SidebarBoardUser = dynamic(() => import('@/components/parts/Sidebar/SidebarBoardUser'));
const SidebarBoardCompany = dynamic(() => import('@/components/parts/Sidebar/SidebarBoardCompany'));

const SideDrawer = async () => {
  const session = await getServerSession(authOptions);
  const profile = session?.profile;

  return (
    <div className="drawer md:hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button btn-sm">
          <Burger />
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" />

        <ul className="min-h-d-screen menu w-80 bg-white p-4 text-base-content">
          <NavbarProfile className="ml-auto" />

          {profile?.role === ROLE.USER ? <SidebarBoardUser /> : <SidebarBoardCompany />}
        </ul>
      </div>
    </div>
  );
};

export default SideDrawer;

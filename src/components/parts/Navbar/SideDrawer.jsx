import { getServerSession } from 'next-auth';

import Burger from '@/assets/icons/bars-3.svg';
import SidebarBoardCompany from '@/components/parts/Sidebar/SidebarBoardCompany';
import SidebarBoardUser from '@/components/parts/Sidebar/SidebarBoardUser';
import { authOptions } from '@/lib/auth';
import { ROLE } from '@/lib/constants/common';

import NavbarProfile from './NavbarProfile';

const SideDrawer = async () => {
  const session = await getServerSession(authOptions);
  const profile = session?.profile;
  return (
    <div className="drawer md:hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          <Burger />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <ul className="menu w-80 min-h-full bg-base-200 p-4 text-base-content">
          <NavbarProfile className="dropdown dropdown-end" />
          {profile?.role === ROLE.USER ? <SidebarBoardUser /> : <SidebarBoardCompany />}
        </ul>
      </div>
    </div>
  );
};

export default SideDrawer;

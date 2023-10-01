import dynamic from 'next/dynamic';
import { getServerSession } from 'next-auth';

import Container from '@/components/elements/Container';
import Navbar from '@/components/parts/Navbar';
import { authOptions } from '@/lib/auth';
import { ROLE } from '@/lib/constants/common';

const SidebarBoardUser = dynamic(() => import('@/components/parts/Sidebar/SidebarBoardUser'));
const SidebarBoardCompany = dynamic(() => import('@/components/parts/Sidebar/SidebarBoardCompany'));

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  const profile = session?.profile;

  return (
    <div className="min-h-d-screen bg-gray-100">
      <Navbar />

      <Container className="grid grid-cols-12 gap-7 py-6">
        {profile?.role === ROLE.USER ? (
          <SidebarBoardUser className="col-span-3 self-start" />
        ) : (
          <SidebarBoardCompany className="col-span-3 self-start" />
        )}

        <main className="col-span-9">{children}</main>
      </Container>
    </div>
  );
};

export default Layout;

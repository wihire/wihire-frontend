import Container from '@/components/elements/Container';
import Navbar from '@/components/parts/Navbar';
import SidebarBoardUser from '@/components/parts/Sidebar/SidebarBoardUser';

const Layout = ({ children }) => (
  <div className="min-h-d-screen bg-gray-100">
    <Navbar />

    <Container className="grid grid-cols-12 gap-7 py-6">
      <SidebarBoardUser className="col-span-3 self-start" />

      <main className="col-span-9">{children}</main>
    </Container>
  </div>
);

export default Layout;

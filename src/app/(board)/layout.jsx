import Container from '@/components/elements/Container';
import Navbar from '@/components/parts/Navbar';
import SidebarBoardUser from '@/components/parts/Sidebar/SidebarBoardUser';

const Layout = ({ children }) => (
  <>
    <Navbar />

    <Container className="my-6 grid grid-cols-12 gap-7">
      <SidebarBoardUser className="col-span-3" />

      <main className="col-span-9">{children}</main>
    </Container>
  </>
);

export default Layout;

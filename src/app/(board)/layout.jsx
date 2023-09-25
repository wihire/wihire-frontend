import Container from '@/components/elements/Container';
import Navbar from '@/components/parts/Navbar';

const Layout = ({ children }) => (
  <>
    <Navbar />

    <Container>
      <main>{children}</main>
    </Container>
  </>
);

export default Layout;

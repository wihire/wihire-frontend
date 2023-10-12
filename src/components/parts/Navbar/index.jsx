import Link from 'next/link';

import Container from '@/components/elements/Container';
import LogoText from '@/components/elements/LogoText';

import NavbarProfile from './NavbarProfile';
import SideDrawer from './SideDrawer';

const Navbar = async () => (
  <nav className="sticky top-0 z-[9999] border-b-[1px] border-gray-200 bg-white">
    <Container className="flex items-center justify-between py-4">
      <Link href="/jobs" title="Wihire">
        <LogoText size="lg" />
      </Link>

      <div>
        <NavbarProfile className="dropdown dropdown-end hidden" />

        <SideDrawer />
      </div>
    </Container>
  </nav>
);

export default Navbar;

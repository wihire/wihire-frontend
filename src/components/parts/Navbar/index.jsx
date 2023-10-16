import Link from 'next/link';

import Container from '@/components/elements/Container';
import LogoText from '@/components/elements/LogoText';

import NavbarProfile from './NavbarProfile';
import SideDrawer from './SideDrawer';

const Navbar = async () => (
  <nav className="sticky top-0 z-[9999] border-b-[1px] border-gray-200 bg-white">
    <Container
      className="flex flex-row-reverse items-center justify-end
      gap-4 py-4 md:flex-row md:justify-between"
    >
      <Link href="/jobs" title="Wihire">
        <LogoText size="lg" />
      </Link>

      <div>
        <NavbarProfile className="dropdown-end hidden md:dropdown" />

        <SideDrawer />
      </div>
    </Container>
  </nav>
);

export default Navbar;

import Link from 'next/link';

import Container from '@/components/elements/Container';
import LogoText from '@/components/elements/LogoText';

import NavbarProfile from './NavbarProfile';

const Navbar = () => (
  <nav className="border-b-[1px] border-gray-200 bg-white">
    <Container className="flex justify-between py-4">
      <Link href="/jobs">
        <LogoText size="lg" />
      </Link>

      <div>
        <NavbarProfile />
      </div>
    </Container>
  </nav>
);

export default Navbar;

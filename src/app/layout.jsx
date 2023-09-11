import { dmSans } from '@/assets/font';
import LayoutClient from '@/components/parts/LayoutClient';
import Providers from '@/components/parts/Providers';
import generateMetadata from '@/lib/metadata';

import '@/assets/styles/globals.scss';

export const metadata = generateMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Providers>
          {children}

          <LayoutClient />
        </Providers>
      </body>
    </html>
  );
}

/* eslint-disable camelcase */
import { DM_Sans } from 'next/font/google';

export const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  fallback: ['system-ui', 'arial', 'sans-serif']
});

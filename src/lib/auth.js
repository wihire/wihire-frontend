import CredentialsProvider from 'next-auth/providers/credentials';

import { getCookie } from '@/lib/cookies';

import { ACCESS_TOKEN_KEY } from './constants/storageKey';
import fetcher from './fetcher';

const MAX_AGE_TOKEN = 60 * 60 * 24 * 7; // 1 week

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE_TOKEN
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const accesToken = getCookie(ACCESS_TOKEN_KEY);

          const profileResponse = await fetcher({
            url: `/profile/${credentials.slug}`,
            headers: {
              authorization: `Bearer ${accesToken}`
            }
          });

          const { profile } = profileResponse.data.data;

          return profile;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // eslint-disable-next-line no-param-reassign
      session.profile = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // eslint-disable-next-line no-param-reassign
        token.user = user;
      }
      return token;
    }
  }
};

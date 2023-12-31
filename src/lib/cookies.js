/* eslint-disable global-require */
import { getCookie as getCookieNext, setCookie } from 'cookies-next';

import { ACCESS_TOKEN_KEY } from './constants/storageKey';

export const getNextCookieStore = () => {
  const { cookies } = require('next/headers');

  return cookies();
};

export const getCookie = (name) => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const cookiesStore = getNextCookieStore();

    return cookiesStore.get(name)?.value;
  }

  return getCookieNext(name);
};

export const setAccessToken = (accessToken, options) => {
  const MAX_AGE_ACCESS_TOKEN = 60 * 60 * 24 * 7; // 1 week

  setCookie(ACCESS_TOKEN_KEY, accessToken, {
    maxAge: MAX_AGE_ACCESS_TOKEN,
    ...options
  });
};

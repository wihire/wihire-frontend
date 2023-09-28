import { getCookie } from '@/lib/cookies';
import { ACCES_TOKEN_KEY } from './constants/storageKey';

const generateQuery = (query) => {
  const queryKeys = Object.keys(query);
  if (queryKeys.length === 0) return '';

  const queryValues = queryKeys.map((key) => {
    if (!query[key]) return null;

    if (Array.isArray(query[key])) {
      const arrayValueQuery = query[key];
      if (arrayValueQuery.length === 0) return null;

      return arrayValueQuery.map((value) => `${key}=${value}`).join('&');
    }

    return `${key}=${query[key]}`;
  });

  const queryString = queryValues.filter((query) => query !== null).join('&');

  return queryString;
};

const parseURL = (url, query) => {
  const [urlWithoutQueries, initialQueries] = url.split('?');

  const listOfQueries = [];
  if (initialQueries) listOfQueries.push(initialQueries);
  if (query) listOfQueries.push(generateQuery(query));

  const queryString = listOfQueries.length > 0 ? `?${listOfQueries.join('&')}` : '';
  return `${urlWithoutQueries}${queryString}`;
};

const fetcher = ({ method = 'GET', ...args }) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    const finalUrl = args?.options?.isFreshURL
      ? args.url
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${args.url}`;

    const accessToken = getCookie(ACCES_TOKEN_KEY);

    const response = await fetch(parseURL(finalUrl, args?.query), {
      method,
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        ...(!args?.options?.isFormData && { 'Content-Type': 'application/json' }),
        ...args?.headers
      },
      cache: args?.cache ?? args?.next ? undefined : 'no-store',
      ...args
    });

    const data = await response.json();

    if (!response.ok) {
      reject(data);
    }

    const result = {
      response,
      data
    };

    resolve(result);
  });

export default fetcher;

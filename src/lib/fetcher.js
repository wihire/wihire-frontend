import { getCookie } from '@/lib/cookies';

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

const fetcher = ({ method = 'GET', ...args }) => {
  const accessToken = getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY);

  const callbackPromise = async (resolve, reject) => {
    const finalUrl = args?.options?.isFreshURL
      ? args.url
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${args.url}`;

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
  };

  return new Promise(callbackPromise);
};

export default fetcher;

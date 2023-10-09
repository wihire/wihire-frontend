import config from '@/lib/config';
import fetcher from '@/lib/fetcher';

export const getProvinces = async () => {
  const response = await fetcher({
    url: `${config.appUrl}/api/province`,
    next: {
      revalidate: 60 * 60 * 24 * 365
    },
    options: {
      isFreshURL: true
    }
  });

  return response;
};

export const getRegencies = async (provinceId) => {
  const response = await fetcher({
    url: `${config.appUrl}/api/regencies/${provinceId}`,
    options: {
      isFreshURL: true
    }
  });

  return response;
};
